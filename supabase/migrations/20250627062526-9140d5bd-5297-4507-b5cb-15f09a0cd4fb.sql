
-- Enable RLS on all tables
ALTER TABLE public."Info Summary" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."LongTermMemory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Hotel Reviews" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."n8n_chat_histories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Conducted Training" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."N8N_2S" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Chat History" ENABLE ROW LEVEL SECURITY;

-- Create a profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for public access tables (Hotel Reviews, Info Summary)
CREATE POLICY "Anyone can read hotel reviews" ON public."Hotel Reviews"
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read info summary" ON public."Info Summary"
  FOR SELECT USING (true);

-- RLS Policies for user-specific data (Chat History, LongTermMemory)
CREATE POLICY "Users can view own chat history" ON public."Chat History"
  FOR SELECT USING (auth.uid()::text = "Sender Number");

CREATE POLICY "Users can insert own chat history" ON public."Chat History"
  FOR INSERT WITH CHECK (auth.uid()::text = "Sender Number");

CREATE POLICY "Users can view own long term memory" ON public."LongTermMemory"
  FOR SELECT USING (auth.uid()::text = sender OR auth.uid()::text = recipient);

CREATE POLICY "Users can insert own long term memory" ON public."LongTermMemory"
  FOR INSERT WITH CHECK (auth.uid()::text = sender OR auth.uid()::text = recipient);

-- RLS Policies for admin-only tables (restrictive by default)
CREATE POLICY "Only authenticated users can read n8n chat histories" ON public."n8n_chat_histories"
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can insert n8n chat histories" ON public."n8n_chat_histories"
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can read conducted training" ON public."Conducted Training"
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can read N8N_2S" ON public."N8N_2S"
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can insert N8N_2S" ON public."N8N_2S"
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

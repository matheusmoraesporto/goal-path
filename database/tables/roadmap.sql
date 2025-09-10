CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE developer_level_enum AS ENUM ('beginner', 'junior', 'intermediate', 'advanced');
CREATE TYPE duration_metric_enum AS ENUM ('years', 'months');
CREATE TYPE frequency_metric_enum AS ENUM ('daily', 'weekly', 'monthly');
CREATE TYPE payment_enum AS ENUM ('free', 'paid', 'both');
CREATE TYPE language_preference_enum AS ENUM ('portuguese', 'english', 'both');
CREATE TYPE metric AS ENUM ('years', 'months');

CREATE TABLE IF NOT EXISTS roadmaps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    developer_level public.developer_level_enum NOT NULL,
    tech_goal VARCHAR(255) NOT NULL,
    duration_amount INT NOT NULL,
    duration_metric public.duration_metric_enum NOT NULL,
    frequency_metric public.frequency_metric_enum NOT NULL,
    frequency_amount INT NOT NULL,
    audio_content BOOLEAN NOT NULL,
    video_content BOOLEAN NOT NULL,
    text_content BOOLEAN NOT NULL,
    document_content BOOLEAN NOT NULL,
    payment public.payment_enum NOT NULL,
    language public.language_preference_enum NOT NULL
);

CREATE TABLE IF NOT EXISTS tech_experiences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
    tech VARCHAR(255) NOT NULL,
    metric public.metric NOT NULL,
    amount INT NOT NULL
);

CREATE TABLE IF NOT EXISTS steps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE
);

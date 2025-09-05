CREATE TABLE IF NOT EXISTS roadmaps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    developer_level enum('beginner', 'junior', 'intermediate', 'advanced') NOT NULL,
    tech_goal VARCHAR(255) NOT NULL,
    time_amount INT NOT NULL,
    time_metric enum('years', 'months') NOT NULL,
    frequency_metric enum('daily', 'weekly', 'monthly') NOT NULL,
    frequency_amount INT NOT NULL,
    audio_content BOOLEAN NOT NULL,
    video_content BOOLEAN NOT NULL,
    text_content BOOLEAN NOT NULL,
    document_content BOOLEAN NOT NULL,
    payment enum('free', 'paid', 'both') NOT NULL,
    language_preference enum('portuguese', 'english', 'both') NOT NULL,
);

CREATE TABLE IF NOT EXISTS tech_experiences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
    tech VARCHAR(255) NOT NULL,
    metric enum('years', 'months') NOT NULL,
    amount INT NOT NULL
);

CREATE TABLE IF NOT EXISTS steps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE
);

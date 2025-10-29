-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  mobile_number VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create workshops table
CREATE TABLE IF NOT EXISTS workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  workshop_id UUID REFERENCES workshops(id),
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  progress INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'in_progress',
  UNIQUE(user_id, workshop_id)
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID REFERENCES workshops(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES assignments(id),
  user_id UUID REFERENCES users(id),
  submission_type VARCHAR(50),
  file_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'pending',
  marks INTEGER,
  feedback TEXT,
  submitted_at TIMESTAMP,
  graded_at TIMESTAMP,
  UNIQUE(assignment_id, user_id)
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  workshop_id UUID REFERENCES workshops(id),
  certificate_url VARCHAR(500),
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  amount DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(100),
  transaction_id VARCHAR(255),
  receipt_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_workshop_id ON enrollments(workshop_id);
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX idx_certificates_user_id ON certificates(user_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);

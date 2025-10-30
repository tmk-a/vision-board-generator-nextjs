# Vision Board Generator

An AI-powered self-discovery application that helps users identify their core values and generate personalized vision boards through interactive conversations.

## 🎯 Purpose

This application aims to help users deepen their self-understanding by:

- Discovering their personal values and aspirations
- Creating a clear sense of identity and confidence
- Finding their "home" - a grounded understanding of who they are

## 👥 Target Users

- **Age:** People in their 20s
- **Situation:** Individuals who have lost sight of their values and goals due to:
  - Job hunting pressure
  - Work/life demands
  - General busyness of daily life

## ✨ Key Features

### MVP (Minimum Viable Product)

- **AI-Powered Questionnaire**: Dynamic question generation based on user responses
- **Core Values Extraction**: AI analysis of user responses to identify personal axes/values
- **Text-Based Vision Generation**: Generation of vision board themes and concepts
- **User Authentication**: Secure login and user management
- **Conversation History**: Save and resume conversations at any time
- **Mobile-First Design**: Fully responsive interface for mobile devices

### Future Enhancements

- Vision board image generation
- Additional user information input methods beyond questionnaires
- Expanded target demographics
- Social media sharing capabilities

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js with React
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

### Backend

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **ORM**: Prisma
- **AI Integration**: Google Gemini API

### Deployment

- **Platform**: Vercel

## 📊 Database Structure

### Core Tables

#### `Conversations`

Manages conversation metadata

- `id`: Unique conversation ID
- `user_id`: Associated user
- `title`: Conversation summary
- `created_at`, `updated_at`: Timestamps

#### `ConversationTurns`

Records each question-answer exchange

- `id`: Unique turn ID
- `conversation_id`: Parent conversation
- `turn_number`: Sequential order
- `question_text`: AI-generated question
- `user_answer`: User's response
- `created_at`: Timestamp

#### `GeneratedVisions`

Stores generated outputs

- `id`: Unique vision ID
- `conversation_id`: Source conversation
- `user_id`: Associated user
- `thema_word`: Vision theme
- `generated_image_url`: Image storage URL (future)
- `generated_text`: Generated vision text
- `created_at`: Timestamp

## 🗂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (main)/          # Main application pages
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── features/        # Feature-specific components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # UI primitives
│   ├── services/
│   │   ├── authService.ts   # Authentication logic
│   │   ├── chatService.ts   # Conversation management
│   │   └── visionService.ts # Vision generation
│   ├── lib/
│   │   ├── ai/              # AI integration
│   │   ├── supabase/        # Supabase client setup
│   │   └── prisma.ts        # Database client
│   └── types/               # TypeScript type definitions
└── prisma/
    └── schema.prisma        # Database schema
```

## 💾 Data Retention Policy

- **Conversation History**: 1 month (automatically deleted after expiration)
- **Generated Visions**: Permanent storage
- **User Summaries**: Permanent storage (created at vision generation time)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Google Gemini API key

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

4. Set up the database

```bash
npx prisma migrate dev
```

5. Run the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 User Experience Flow

1. **Authentication**: User signs up or logs in
2. **Question Flow**: User answers AI-generated questions one at a time
3. **Pause & Resume**: Conversations can be paused and resumed anytime
4. **Analysis**: Once minimum questions are answered, user can generate their vision
5. **Output**: AI extracts core values and generates a personalized vision statement
6. **History**: Users can view past conversations and generated visions

## 🔒 Storage Capacity

**Estimated Total Storage**: 1-2GB

- **Text Data** (responses, visions, history): ~1GB for 1,000 users
- **Image Data** (future feature): ~500MB for 100 users with 5 images each
- Per user storage: ~1-5MB average

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

Built with ❤️ to help people discover their true selves

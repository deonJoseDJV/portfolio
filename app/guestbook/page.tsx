'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Github, Mail } from 'lucide-react'
import Link from 'next/link'

export default function GuestbookPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    fetchMessages()

    return () => subscription.unsubscribe()
  }, [])

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })

    setMessages(data || [])
  }

  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const submitMessage = async () => {
    if (!user || !newMessage.trim() || submitting) return

    setSubmitting(true)

    try {
      const { error } = await supabase.from('guestbook').insert({
        name:
          user.user_metadata?.full_name ||
          user.email?.split('@')[0] ||
          'Anonymous',
        email: user.email,
        message: newMessage,
        avatar_url: user.user_metadata?.avatar_url,
      })

      if (error) throw error

      setNewMessage('')
      fetchMessages()
    } finally {
      setSubmitting(false)
    }
  }

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diff = Math.floor(
      (now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diff <= 1) return '1d ago'
    if (diff < 7) return `${diff}d ago`
    if (diff < 30) return `${Math.floor(diff / 7)}w ago`
    return `${Math.floor(diff / 30)}mo ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/40">
        Loading...
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-heroDark">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        {/* BACK */}
        <Link
          href="/#other"
          className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition mb-12"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to home</span>
        </Link>

        {/* HERO */}
        <div className="text-center mb-14">
          <p className="text-primary/80 text-xs tracking-[0.35em] font-mono mb-4">
            THE COMMUNITY WALL
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Leave Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
              Mark
            </span>
          </h1>

          <p className="text-white/60 max-w-xl mx-auto">
            Share your thoughts, feedback, or just say hi!
          </p>
        </div>

        {/* AUTH CARD */}
        {!user ? (
          <div className="relative rounded-3xl p-10 mb-16 border border-purple-500/20 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.25)]">
            <p className="text-center text-white/60 mb-8">
              Sign in to pin your message to this board forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={signInWithGithub}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-purple-400/40 transition text-white font-medium min-w-[220px]"
              >
                <Github size={18} />
                Sign in with GitHub
              </button>

              <button
                onClick={signInWithGoogle}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-purple-400/40 transition text-white font-medium min-w-[220px]"
              >
                <Mail size={18} />
                Sign in with Google
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-8 mb-16">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    className="w-10 h-10 rounded-full"
                    alt="avatar"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                <span className="text-white font-medium">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </div>

              <button
                onClick={signOut}
                className="text-white/40 hover:text-white text-sm transition"
              >
                Sign out
              </button>
            </div>

            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/50 mb-4"
              rows={3}
            />

            <button
              onClick={submitMessage}
              disabled={submitting || !newMessage.trim()}
              className="px-6 py-3 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 transition text-white"
            >
              {submitting ? 'Posting...' : 'Post Message'}
            </button>
          </div>
        )}

        {/* MESSAGES */}
        <div className="space-y-6">
          {messages.length === 0 ? (
            <p className="text-white/30 text-center py-10">
              No messages yet. Be the first to leave your mark!
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-purple-400/30 transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  {msg.avatar_url ? (
                    <img
                      src={msg.avatar_url}
                      className="w-10 h-10 rounded-full"
                      alt={msg.name}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {msg.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-white font-medium">
                      {msg.name}
                    </span>
                    <span className="text-white/30 text-xs ml-2">
                      {new Date(msg.created_at).toLocaleDateString(
                        'en-US',
                        { month: 'short', day: 'numeric' }
                      )}{' '}
                      • {getTimeAgo(msg.created_at)}
                    </span>
                  </div>
                </div>

                <p className="text-white/70 text-sm ml-13">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
'use client'

import { useEffect } from 'react'
import Clarity from '@microsoft/clarity'
import { supabase } from '@/lib/supabase'

const PROJECT_ID = 'wlrehwlh6j'

export default function ClarityProvider() {
  useEffect(() => {
    Clarity.init(PROJECT_ID)

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        Clarity.identify(session.user.id)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.id) {
        Clarity.identify(session.user.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return null
}

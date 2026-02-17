'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  email: string | null
  login: (email: string, password: string, rememberMe: boolean) => { success: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const VALID_EMAIL = 'intern@demo.com'
const VALID_PASSWORD = 'intern123'
const AUTH_KEY = 'taskboard_auth'
const REMEMBER_KEY = 'taskboard_remember'

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const auth = localStorage.getItem(AUTH_KEY)
        const rememberMe = localStorage.getItem(REMEMBER_KEY)
        
        if (auth === 'true' && rememberMe === 'true') {
          setIsAuthenticated(true)
          setEmail(VALID_EMAIL)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      }
    }
    setIsHydrated(true)
  }, [])

  const login = useCallback((email: string, password: string, rememberMe: boolean) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsAuthenticated(true)
      setEmail(email)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_KEY, 'true')
        if (rememberMe) {
          localStorage.setItem(REMEMBER_KEY, 'true')
        } else {
          localStorage.removeItem(REMEMBER_KEY)
        }
      }
      
      return { success: true }
    }

    return { 
      success: false, 
      error: 'Invalid email or password' 
    }
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setEmail(null)
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY)
      localStorage.removeItem(REMEMBER_KEY)
    }
  }, [])

  if (!isHydrated) {
    return <div className="min-h-screen" />
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

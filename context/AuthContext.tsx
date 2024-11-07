import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

type AuthContextType = {
  user: User | null
  createUser: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
  isLoading: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

const UserContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const createUser = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      await setDoc(doc(FIREBASE_DB, 'users', email), {
        createdAt: new Date(),
      })
    } catch (error) {
      console.error('Error creating user: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      )
      return userCredential.user
    } catch (error) {
      console.error('Error logging in: ', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await signOut(FIREBASE_AUTH)
    } catch (error) {
      console.error('Error logging out: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <UserContext.Provider
      value={{ user, createUser, logout, login, isLoading }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = (): AuthContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('UserAuth must be used within an AuthContextProvider')
  }
  return context
}

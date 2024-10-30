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
}

type AuthContextProviderProps = {
  children: ReactNode
}

const UserContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  const createUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    await setDoc(doc(FIREBASE_DB, 'users', email), {
      brews: [],
    })
  }

  const login = async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    )
    return userCredential.user
  }

  const logout = () => {
    return signOut(FIREBASE_AUTH)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ user, createUser, logout, login }}>
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

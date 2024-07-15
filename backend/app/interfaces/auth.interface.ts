export interface ILoginResponse {
  token: string
  user: {
    id: number
    fullName: string | null
    email: string
    createdAt: string
    updatedAt: string | null
  }
}

export interface ILoginPayload {
  email: string
  password: string
}

export interface IRegisterPayload {
  fullName: string
  email: string
  password: string
}

export interface IRegisterResponse {
  user: {
    id: number
    fullName: string | null
    email: string
    createdAt: string
    updatedAt: string | null
  }
}

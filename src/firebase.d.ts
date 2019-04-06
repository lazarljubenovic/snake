interface RtdbUser {
  avatarUrl: string
  displayName: string
  email: string
}

type RtdbProfile = {
  isLoaded: false
} | {
  isLoaded: true
  isEmpty: true
} | ({
  isLoaded: true
  isEmpty: false
} & RtdbUser)

interface RtdbGameScore {
  score: number
  size: number
  speed: number
  user: string // uid
  userDisplayName: string
}

interface RtdbSchema {
  users: FirebaseRecord<RtdbUser>
  gameScores: FirebaseRecord<RtdbGameScore>
}

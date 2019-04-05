interface RtdbUser {
  avatarUrl: string
  displayName: string
  email: string
}

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

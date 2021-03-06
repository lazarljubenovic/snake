// make react-redux-firebase aware of the schema, globally

declare module 'react-redux-firebase' {
  export interface FirebaseRtdbSchema extends RtdbSchema { }

  import React from 'react'
  import * as Firebase from 'firebase'
  import * as FirestoreTypes from '@firebase/firestore-types'
  import * as DatabaseTypes from '@firebase/database-types'
  import * as StorageTypes from '@firebase/storage-types'
  import * as AuthTypes from '@firebase/auth-types'
  import * as AppTypes from '@firebase/app-types'
  import { Dispatch } from 'redux'
  import { InferableComponentEnhancerWithProps } from 'react-redux'

  export interface FirebaseInstance { }

  export interface EnhancedFirebaseInstance {
    login: () => void
  }

  // Diff / Omit taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

  // Some helpers.
  export type Dict<T = any> = Record<string, T>
  export type KvPair<T> = { key: string, value: T }
  export type KvPairs<T> = Array<KvPair<T>>


  // Merge into this interface from your own code in order to specify
  // a single schema for your Firebase RTDB (Realtime Database).
  // export interface FirebaseRtdbSchema { }

  // Injects props and removes them from the prop requirements.
  // Will not pass through the injected props if they are passed in during
  // render. Also adds new prop requirements from TNeedsProps.
  // export interface InferableComponentEnhancerWithProps<
  //   TInjectedProps,
  //   TNeedsProps
  //   > {
  //   <P extends TInjectedProps>(
  //     component: React.Component<P>
  //   ): React.ComponentType<Omit<P, keyof TInjectedProps> & TNeedsProps>
  // }

  type mapper<TInner, TOutter> = (input: TInner) => TOutter

  export const actionTypes: {
    START: string
    SET: string
    REMOVE: string
    MERGE: string
    SET_PROFILE: string
    LOGIN: string
    LOGOUT: string
    LOGIN_ERROR: string
    NO_VALUE: string
    UNAUTHORIZED_ERROR: string
    ERROR: string
    CLEAR_ERRORS: string
    SET_LISTENER: string
    UNSET_LISTENER: string
    AUTHENTICATION_INIT_FINISHED: string
    AUTHENTICATION_INIT_STARTED: string
    SESSION_START: string
    SESSION_END: string
    FILE_UPLOAD_START: string
    FILE_UPLOAD_ERROR: string
    FILE_UPLOAD_PROGRESS: string
    FILE_UPLOAD_COMPLETE: string
    FILE_DELETE_START: string
    FILE_DELETE_ERROR: string
    FILE_DELETE_COMPLETE: string
    AUTH_UPDATE_START: string
    AUTH_UPDATE_ERROR: string
    AUTH_UPDATE_SUCCESS: string
    AUTH_EMPTY_CHANGE: string
    AUTH_LINK_ERROR: string
    AUTH_LINK_START: string
    AUTH_LINK_SUCCESS: string
    AUTH_RELOAD_ERROR: string
    AUTH_RELOAD_START: string
    AUTH_RELOAD_SUCCESS: string
    EMAIL_UPDATE_ERROR: string
    EMAIL_UPDATE_START: string
    EMAIL_UPDATE_SUCCESS: string
    PROFILE_UPDATE_START: string
    PROFILE_UPDATE_ERROR: string
    PROFILE_UPDATE_SUCCESS: string
  }

  export const constants: {
    actionTypes: {
      AUTHENTICATION_INIT_FINISHED: string
      AUTHENTICATION_INIT_STARTED: string
      AUTH_EMPTY_CHANGE: string
      AUTH_LINK_ERROR: string
      AUTH_LINK_START: string
      AUTH_LINK_SUCCESS: string
      AUTH_RELOAD_ERROR: string
      AUTH_RELOAD_START: string
      AUTH_RELOAD_SUCCESS: string
      AUTH_UPDATE_ERROR: string
      AUTH_UPDATE_START: string
      AUTH_UPDATE_SUCCESS: string
      CLEAR_ERRORS: string
      EMAIL_UPDATE_ERROR: string
      EMAIL_UPDATE_START: string
      EMAIL_UPDATE_SUCCESS: string
      ERROR: string
      FILE_DELETE_COMPLETE: string
      FILE_DELETE_ERROR: string
      FILE_DELETE_START: string
      FILE_UPLOAD_COMPLETE: string
      FILE_UPLOAD_ERROR: string
      FILE_UPLOAD_PROGRESS: string
      FILE_UPLOAD_START: string
      LOGIN: string
      LOGIN_ERROR: string
      LOGOUT: string
      MERGE: string
      NO_VALUE: string
      PROFILE_UPDATE_ERROR: string
      PROFILE_UPDATE_START: string
      PROFILE_UPDATE_SUCCESS: string
      REMOVE: string
      SESSION_END: string
      SESSION_START: string
      SET: string
      SET_LISTENER: string
      SET_PROFILE: string
      START: string
      UNAUTHORIZED_ERROR: string
      UNSET_LISTENER: string
    }
    defaultConfig: ReactReduxFirebaseConfig
  }

  /**
   * Promise which resolves when auth state has loaded.
   */
  export function authIsReady(store: object, ...args: any[]): any

  /**
   * Factory function for creating a firebaseConnect Higher Order Component
   */
  export function createFirebaseConnect(...args: any[]): any

  /**
   * Create a firebase instance that has helpers attached for dispatching actions
   */
  export function createFirebaseInstance(
    firebase: FirebaseInstance,
    configs: Partial<ReduxFirestoreConfig>,
    dispatch: Dispatch,
    ...args: any[]
  ): EnhancedFirebaseInstance

  export function createFirestoreConnect(...args: any[]): any

  export function createWithFirebase(storeKey: any): any

  export function createWithFirestore(storeKey: any): any

  // https://github.com/prescottprue/redux-firestore#query-options
  type WhereOptions = [string, FirestoreTypes.WhereFilterOp, any]
  type OrderByOptions = [string, FirestoreTypes.OrderByDirection]
  export interface FirestoreQueryOptions {
    // https://github.com/prescottprue/redux-firestore#collection
    collection: string
    // https://github.com/prescottprue/redux-firestore#document
    doc?: string
    // https://github.com/prescottprue/redux-firestore#sub-collections
    subcollections?: FirestoreQueryOptions[]
    // https://github.com/prescottprue/redux-firestore#where
    where?: WhereOptions | WhereOptions[]
    // https://github.com/prescottprue/redux-firestore#orderby
    orderBy?: OrderByOptions | OrderByOptions[]
    // https://github.com/prescottprue/redux-firestore#limit
    limit?: number
    // https://github.com/prescottprue/redux-firestore#storeas
    storeAs?: string
    // https://github.com/prescottprue/redux-firestore#startat
    startAt?: FirestoreTypes.DocumentSnapshot | any | any[]
    // https://github.com/prescottprue/redux-firestore#startafter
    startAfter?: FirestoreTypes.DocumentSnapshot | any | any[]
    // https://github.com/prescottprue/redux-firestore#endat
    endAt?: FirestoreTypes.DocumentSnapshot | any | any[]
    // https://github.com/prescottprue/redux-firestore#endbefore
    endBefore?: FirestoreTypes.DocumentSnapshot | any | any[]
  }

  // https://github.com/prescottprue/redux-firestore#api
  interface ReduxFirestoreApi {
    // https://github.com/prescottprue/redux-firestore#get
    // https://github.com/prescottprue/redux-firestore#get-1
    get: (docPath: string | FirestoreQueryOptions) => Promise<void>

    // https://github.com/prescottprue/redux-firestore#set
    set: (docPath: string | FirestoreQueryOptions, data: Object) => Promise<void>

    // https://github.com/prescottprue/redux-firestore#add
    add: (
      collectionPath: string | FirestoreQueryOptions,
      data: Object
    ) => Promise<{ id: string }>

    // https://github.com/prescottprue/redux-firestore#update
    update: (
      docPath: string | FirestoreQueryOptions,
      data: Object
    ) => Promise<void>

    // https://github.com/prescottprue/redux-firestore#delete
    delete: (docPath: string | FirestoreQueryOptions) => void

    // https://github.com/prescottprue/redux-firestore#runtransaction
    runTransaction: (transaction: WithFirestoreProps['firestore']) => Promise<any>

    // https://github.com/prescottprue/redux-firestore#onsnapshotsetlistener
    onSnapshot: (options: FirestoreQueryOptions) => Promise<void>
    setListener: (options: FirestoreQueryOptions) => Promise<void>

    //https://github.com/prescottprue/redux-firestore#setlisteners
    setListeners: (optionsArray: FirestoreQueryOptions[]) => Promise<void>

    // https://github.com/prescottprue/redux-firestore#unsetlistener--unsetlisteners
    unsetListener: (options: FirestoreQueryOptions) => void
    unsetListeners: (options: FirestoreQueryOptions[]) => void
  }

  // https://github.com/prescottprue/redux-firestore#other-firebase-statics
  interface FirestoreStatics {
    FieldValue: FirestoreTypes.FieldValue
    FieldPath: FirestoreTypes.FieldPath
    setLogLevel: (logLevel: FirestoreTypes.LogLevel) => void
    Blob: FirestoreTypes.Blob
    CollectionReference: FirestoreTypes.CollectionReference
    DocumentReference: FirestoreTypes.DocumentReference
    DocumentSnapshot: FirestoreTypes.DocumentSnapshot
    GeoPoint: FirestoreTypes.GeoPoint
    Query: FirestoreTypes.Query
    QueryDocumentSnapshot: FirestoreTypes.QueryDocumentSnapshot
    QuerySnapshot: FirestoreTypes.QuerySnapshot
    Timestamp: FirestoreTypes.FieldValue
    Transaction: FirestoreTypes.Transaction
    WriteBatch: FirestoreTypes.WriteBatch
  }

  export interface WithFirestoreProps {
    firestore: FirestoreTypes.FirebaseFirestore &
    ReduxFirestoreApi &
    FirestoreStatics
    firebase: FirebaseInstance
    dispatch: Dispatch
  }

  type Credentials =
    | {
      email: string
      password: string
    }
    | {
      provider: 'facebook' | 'google' | 'twitter'
      type: 'popup' | 'redirect'
      scopes?: string[]
    }
    | AuthTypes.AuthCredential
    | {
      token: string
      profile: Object
    }
    | {
      phoneNumber: string
      applicationVerifier: AuthTypes.ApplicationVerifier
    }

  interface CreateUserCredentials {
    email: string
    password: string
    signIn?: boolean // default true
  }

  interface UserProfile {
    email: string
    username: string
  }

  // http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html
  interface Auth {
    auth: () => AuthTypes.FirebaseAuth

    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#logincredentials
    login: (credentials: Credentials) => Promise<AuthTypes.UserCredential>

    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#createusercredentials-profile
    createUser: (
      credentials: CreateUserCredentials,
      profile: UserProfile
    ) => Promise<AuthTypes.UserInfo>

    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#logout
    logout: VoidFunction

    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#resetpasswordcredentials
    resetPassword: (
      credentials: AuthTypes.UserCredential,
      profile: UserProfile
    ) => Promise<any>

    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#confirmpasswordresetcode-newpassword
    confirmPasswordReset: AuthTypes.FirebaseAuth['confirmPasswordReset']

    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#verifypasswordresetcodecode
    verifyPasswordResetCode: AuthTypes.FirebaseAuth['verifyPasswordResetCode']

    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html#signinwithphonenumbercode
    signInWithPhoneNumber: AuthTypes.FirebaseAuth['signInWithPhoneNumber']

    updateEmail: (newEmail: string, updateInProfile: boolean) => Promise<void>
    reloadAuth: () => Promise<void>
    linkWithCredential: (
      credential: AuthTypes.AuthCredential
    ) => Promise<AuthTypes.User>

    updateAuth: (
      authUpdate: {
        displayName: string | null
        photoURL: string | null
      },
      updateInProfile: boolean
    ) => Promise<void>

    //http://docs.react-redux-firebase.com/history/v3.0.0/docs/recipes/profile.html
    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/recipes/profile.html#update-profile
    updateProfile: (profile: Partial<ProfileType>, options: Object) => void
  }

  //http://docs.react-redux-firebase.com/history/v3.0.0/docs/storage.html
  interface Storage {
    storage: () => StorageTypes.FirebaseStorage

    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/storage.html#deletefile
    deleteFile: (
      path: string,
      dbPath?: string
    ) => Promise<{ path: string; dbPath: string }>

    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/storage.html#uploadfile
    uploadFile: (
      path: string,
      files: File,
      dbPath?: string,
      options?: {
        name:
        | string
        | ((
          file: File,
          internalFirebase: WithFirebaseProps<ProfileType>['firebase'],
          uploadConfig: object
        ) => string)
      }
    ) => Promise<StorageTypes.UploadTaskSnapshot>

    // http://docs.react-redux-firebase.com/history/v3.0.0/docs/storage.html#uploadfiles
    uploadFiles: (
      path: string,
      files: File[],
      dbPath?: string,
      options?: {
        name:
        | string
        | ((
          file: File,
          internalFirebase: WithFirebaseProps<ProfileType>['firebase'],
          uploadConfig: object
        ) => string)
      }
    ) => Promise<{ uploadTaskSnapshot: StorageTypes.UploadTaskSnapshot }[]>
  }

  export interface WithFirebaseProps<ProfileType> {
    firebase: Auth &
    Storage & {
      initializeApp: (options: Object, name?: string) => FirebaseInstance

      initializeAuth: VoidFunction

      ref: (path: string | DatabaseTypes.Reference) => DatabaseTypes.Reference

      firestore: DatabaseTypes.FirebaseDatabase

      promiseEvents: (
        watchArray: (string | object)[],
        options: object
      ) => Promise<any>

      dispatch: Dispatch

      // http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#set
      set: (
        path: string,
        value: object | string | boolean | number,
        onComplete?: Function
      ) => Promise<DatabaseTypes.DataSnapshot>

      setWithMeta: (
        path: string,
        value: object | string | boolean | number,
        onComplete: Function
      ) => Promise<DatabaseTypes.DataSnapshot>

      // http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#push
      push: (
        path: string,
        value: object | string | boolean | number,
        onComplete?: Function
      ) => Promise<DatabaseTypes.DataSnapshot>

      pushWithMeta: (
        path: string,
        value: object | string | boolean | number,
        onComplete: Function
      ) => Promise<DatabaseTypes.DataSnapshot>

      // http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#update
      update: (
        path: string,
        value: object | string | boolean | number,
        onComplete?: Function
      ) => Promise<DatabaseTypes.DataSnapshot>

      updateWithMeta: (
        path: string,
        value: object | string | boolean | number,
        onComplete: Function
      ) => Promise<DatabaseTypes.DataSnapshot>

      // http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#remove
      remove: (
        path: string,
        value: object | string | boolean | number,
        onComplete?: Function
      ) => Promise<DatabaseTypes.DataSnapshot>

      // http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#uniqueset
      uniqueSet: (
        path: string,
        value: object | string | boolean | number,
        onComplete?: Function
      ) => Promise<DatabaseTypes.DataSnapshot>

      // http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#watchevent
      watchEvent: (
        type: string,
        path: string,
        storeAs: string,
        options?: object
      ) => Promise<any>

      // http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/props-firebase.html#unwatchevent
      unWatchEvent: (
        type: string,
        path: string,
        queryId: string,
        options?: string
      ) => Promise<any>
    }
  }

  export interface FirebaseConnectQueryObject<T extends Dict = FirebaseRtdbSchema> {
    path: keyof T
    type?: 'value' | 'once' | 'child_added' | 'child_removed' | 'child_changed' | 'child_moved'
    queryParams?: string[]
  }

  export type FirebaseConnectQuery<T extends Dict = FirebaseRtdbSchema> = (FirebaseConnectQueryObject<T> | keyof T)[]

  /**
   * React HOC that attaches/detaches Firebase Real Time Database listeners on mount/unmount
   */
  export function firebaseConnect<TOwnProps = {}, TSchema extends Dict = FirebaseRtdbSchema>(
    connect?: mapper<TOwnProps, FirebaseConnectQuery<TSchema>> | FirebaseConnectQuery<TSchema>
  ): InferableComponentEnhancerWithProps<
  WithFirebaseProps<{}>,
  TOwnProps
  >

  /**
   * Reducer for Firebase state
   */
  export function firebaseReducer<UserType>(
    ...args: any[]
  ): FirebaseReducer.Reducer<UserType>

  /**
   * Reducer for Firebase state
   */
  export function firebaseStateReducer(...args: any[]): FirestoreReducer.Reducer

  /**
   * React HOC that attaches/detaches Cloud Firestore listeners on mount/unmount
   */
  export function firestoreConnect<TInner = {}>(
    connect?:
      | mapper<TInner, (string | FirestoreQueryOptions)[]>
      | FirestoreQueryOptions[]
      | string[]
  ): InferableComponentEnhancerWithProps<
  TInner & WithFirestoreProps,
  WithFirestoreProps
  >

  /**
   * Reducer for Firestore state
   */
  export function firestoreReducer(...args: any[]): FirestoreReducer.Reducer

  export function fixPath(path: string): string

  /**
   * Get Firebase instance
   * http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/get-firebase.html
   */
  export function getFirebase(): AppTypes.FirebaseApp

  export function getVal(firebase: object, path: string, notSetValue?: any): any

  export function isEmpty(...args: any[]): boolean

  export function isLoaded(...args: any[]): boolean

  export function populate(
    state: object,
    path: string,
    populates: any,
    notSetValue?: any
  ): any

  /**
   * React Context provider for Firebase instance (with methods wrapped in dispatch).
   * Needed to use HOCs like firebaseConnect and withFirebase.
   */
  export function ReactReduxFirebaseProvider(
    props: ReactReduxFirebaseProviderProps
  ): any

  /**
   * Props passed to ReactReduxFirebaseContext component
   */
  export interface ReactReduxFirebaseProviderProps {
    firebase: FirebaseInstance
    config: Partial<ReactReduxFirebaseConfig>
    dispatch: Dispatch
    children?: React.ReactNode
    initalizeAuth?: boolean
    createFirestoreInstance?: (
      firebase: FirebaseInstance,
      configs: Partial<ReduxFirestoreConfig>,
      dispatch: Dispatch
    ) => object
  }

  /**
   * React Context for Firebase instance.
   */
  export namespace ReduxFirestoreContext {
    const prototype: {}
  }

  interface ReactReduxFirebaseConfig {
    attachAuthIsReady: boolean
    autoPopulateProfile: boolean
    dispatchOnUnsetListener: boolean
    dispatchRemoveAction: boolean
    enableEmptyAuthChanges: boolean
    enableLogging: boolean
    enableRedirectHandling: boolean
    firebaseStateName: string
    logErrors: boolean
    presence: any
    preserveOnEmptyAuthChange: any
    preserveOnLogout: any
    resetBeforeLogin: boolean
    sessions: string
    setProfilePopulateResults: boolean
    updateProfileOnLogin: boolean
    userProfile: string | null
    // Use Firestore for Profile instead of Realtime DB
    useFirestoreForProfile?: boolean
  }

  export interface ReduxFirestoreConfig {
    enableLogging: boolean

    helpersNamespace: string | null

    // https://github.com/prescottprue/redux-firestore#loglistenererror
    logListenerError: boolean

    // https://github.com/prescottprue/redux-firestore#enhancernamespace
    enhancerNamespace: string

    // https://github.com/prescottprue/redux-firestore#allowmultiplelisteners
    allowMultipleListeners:
    | ((listenerToAttach: any, currentListeners: any) => boolean)
    | boolean

    // https://github.com/prescottprue/redux-firestore#preserveondelete
    preserveOnDelete: null | object

    // https://github.com/prescottprue/redux-firestore#preserveonlistenererror
    preserveOnListenerError: null | object

    // https://github.com/prescottprue/redux-firestore#onattemptcollectiondelete
    onAttemptCollectionDelete: null | ((queryOption, dispatch, firebase) => void)

    // https://github.com/prescottprue/redux-firestore#mergeordered
    mergeOrdered: boolean

    // https://github.com/prescottprue/redux-firestore#mergeordereddocupdate
    mergeOrderedDocUpdate: boolean

    // https://github.com/prescottprue/redux-firestore#mergeorderedcollectionupdates
    mergeOrderedCollectionUpdates: boolean
  }

  /**
   * Props passed to ReactReduFirebaseContext component
   */
  export interface ReduxFirestoreProviderProps {
    firebase: FirebaseInstance
    config: Partial<ReactReduxFirebaseConfig>
    dispatch: (action: object) => void
    createFirestoreInstance: (
      firebase: FirebaseInstance,
      configs: Partial<ReduxFirestoreConfig>,
      dispatch: Dispatch
    ) => object
    children?: React.ReactNode
    initalizeAuth?: boolean
  }

  /**
   * React Context provider for Firestore instance (with methods wrapped in dispatch). Needed to use HOCs
   * like firestoreConnect and withFirestore.
   */
  export function ReduxFirestoreProvider(props: ReduxFirestoreProviderProps): any

  /**
   * React Higher Order Component that passes firebase as a prop (comes from context.store.firebase)
   * http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/withFirebase.html
   */
  export function withFirebase(
    ComponentToWrap: React.ComponentType
  ): React.ComponentType<WithFirebaseProps<ProfileType>>

  /**
   * React Higher Order Component that passes firestore as a prop (comes from context.store.firestore)
   * http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/withFirestore.html
   */
  export function withFirestore(
    ComponentToWrap: React.ComponentType
  ): React.ComponentType<WithFirestoreProps>

  export namespace authIsReady {
    const prototype: {}
  }

  export namespace createFirebaseConnect {
    const prototype: {}
  }

  export namespace createFirebaseInstance {
    const prototype: {}
  }

  export namespace createWithFirebase {
    const prototype: {}
  }

  export namespace createWithFirestore {
    const prototype: {}
  }

  // Your Firebase/Firestore user profile object type
  // http://docs.react-redux-firebase.com/history/v3.0.0/docs/recipes/profile.html
  export type ProfileType = {}

  export interface Listeners {
    allIds: string[]
    byId: {
      [path: string]: {
        name: string
      }
    }
  }

  export type Ordered<T extends Record<string, any> = FirebaseRtdbSchema, K1 extends keyof T = keyof T> = { key: string, value: T[K1] }

  export type Dictionary<T> = Partial<Record<keyof FirebaseRtdbSchema, T>>

  export interface Data<T extends FirestoreTypes.DocumentData> {
    [collection: string]: T
  }

  export namespace FirebaseReducer {
    export interface Reducer<ProfileType = {}> {
      auth: Auth
      profile: Profile<ProfileType>
      authError: any
      data: Data<any | Dictionary<any>>
      ordered: Partial<Record<keyof FirebaseRtdbSchema, Ordered[]>>
      errors: any[]
      isInitializing: boolean
      listeners: Listeners
      requested: Dictionary<boolean>
      requesting: Dictionary<boolean>
      timestamps: Dictionary<number>
    }

    export interface Auth extends AuthTypes.UserInfo {
      isLoaded: boolean
      isEmpty: boolean
      apiKey: string
      appName: string
      authDomain: string
      createdAt: string
      emailVerified: boolean
      isAnonymous: boolean
      lastLoginAt: string
      providerData: AuthTypes.UserInfo[] | null
      redirectEventId: null
      stsTokenManager: {
        accessToken: string
        apiKey: string
        expirationTime: number
        refreshToken: string
      }
    }

    // can be extended for optional properties from your database
    export type Profile<ProfileType> = {
      isLoaded: boolean
      isEmpty: boolean
    } & ProfileType

    export namespace firebaseStateReducer {
      const prototype: {}
    }
  }

  export namespace FirestoreReducer {
    export interface Reducer {
      composite?: Data<any | Dictionary<any>>
      data: Data<any | Dictionary<any>>
      errors: {
        allIds: string[]
        byQuery: any[]
      }
      listeners: Listeners
      ordered: Record<keyof FirebaseRtdbSchema, Ordered>
      queries: Data<FirestoreQueryOptions & (Dictionary<any> | any)>
      status: {
        requested: Dictionary<boolean>
        requesting: Dictionary<boolean>
        timestamps: Dictionary<number>
      }
    }

    const prototype: {}
  }

  export namespace fixPath {
    const prototype: {}
  }

  export namespace getVal {
    const prototype: {}
  }

  export namespace helpers {
    function fixPath(path: any): any

    function getVal(firebase: any, path: any, notSetValue?: any): any

    function isEmpty(...args: any[]): any

    function isLoaded(...args: any[]): any

    function populate(
      state: any,
      path: any,
      populates: any,
      notSetValue?: any
    ): any

    namespace fixPath {
      const prototype: {}
    }

    namespace getVal {
      const prototype: {}
    }

    namespace isEmpty {
      const prototype: {}
    }

    namespace isLoaded {
      const prototype: {}
    }

    namespace populate {
      const prototype: {}
    }
  }

  export namespace isEmpty {
    const prototype: {}
  }

  export namespace isLoaded {
    const prototype: {}
  }

  export namespace populate {
    const prototype: {}
  }

  export namespace reactReduxFirebase {
    const prototype: {}
  }

  export namespace reduxFirebase {
    const prototype: {}
  }

  export namespace reduxReactFirebase {
    const prototype: {}
  }


}

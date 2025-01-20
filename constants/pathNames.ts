export const paths = {
  home: '/' as const,
  world: (worldId: string) => `/worlds/${worldId}`,
  createWorld: '/worlds/create-new-world' as const,
}

import {HostOptions} from '../interfaces/HostOptions'

const defaultOptions = {
  typesFolder: '@mf-types',
  deleteTypesFolder: true
}

const retrieveRemoteStringUrl = (remote: string) => {
  const splittedRemote = remote.split('@')
  return splittedRemote[splittedRemote.length - 1]
}

const buildZipUrl = (hostOptions: Required<HostOptions>, remote: string) => {
  const remoteStringUrl = retrieveRemoteStringUrl(remote)
  const remoteUrl = new URL(remoteStringUrl)

  const pathnameWithoutEntry = remoteUrl.pathname.split('/').slice(0, -1).join('/')
  remoteUrl.pathname = `${pathnameWithoutEntry}/${hostOptions.typesFolder}.zip`

  return remoteUrl.href
}

const resolveRemotes = (hostOptions: Required<HostOptions>) => {
  return Object.entries(hostOptions.moduleFederationConfig.remotes as Record<string, string>)
    .reduce((accumulator, [key, remote]) => {
      accumulator[key] = buildZipUrl(hostOptions, remote)
      return accumulator
    }, {} as Record<string, string>)
}

export const retrieveHostConfig = (options: HostOptions) => {
  if (!options.moduleFederationConfig) {
    throw new Error('moduleFederationConfig is required')
  }

  const hostOptions: Required<HostOptions> = {...defaultOptions, ...options}
  const mapRemotesToDownload = resolveRemotes(hostOptions)

  return {
    hostOptions,
    mapRemotesToDownload
  }
}

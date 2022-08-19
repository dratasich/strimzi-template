/*
 * Info comment for the beginning of a yaml file
 */
export function Info({ asyncapi }) {
  return `# Generated from '${asyncapi.info().title()}' version ${asyncapi.info().version()}
# asyncAPI id: ${asyncapi.id()}
# generation date: ${new Date(Date.now()).toISOString()}
`;
}

/*
 * Modify a name to a valid kubernetes resource name.
 */
export function normalizeKubernetesName(name) {
  // https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
  // DNS label standard [RFC 1123](https://www.rfc-editor.org/rfc/rfc1123)
  // replace special characters with '-'
  return name.replace(/\//g, '-')
}

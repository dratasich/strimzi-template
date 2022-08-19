import { File, render } from '@asyncapi/generator-react-sdk';

// Import custom components from file
import { Info, normalizeKubernetesName } from '../components/common';
import { Topic } from '../components/Topic';

/*
 * To render multiple files, it is enough to return an array of "File" components in the rendering component, like in following example.
 */
export default function ({ asyncapi }) {
  const channels = asyncapi.channels();

  return Object.entries(channels).map(([channelName, channel]) => {
    if (!channel.hasSubscribe()) return null;
    const name = normalizeKubernetesName(channelName)

    return (
      <File name={`${name}.yaml`}>
        {render(<Info asyncapi={asyncapi} />)}
        {render(`---\n`)}
        {render(<Topic resourceName={name} channelName={channelName} channel={channel} />)}
        {render(`...\n`)}
      </File>
    );
  });
}

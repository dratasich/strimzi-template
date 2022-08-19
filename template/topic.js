import { File, render } from '@asyncapi/generator-react-sdk';

// Import custom components from file
import { Info } from '../components/common';
import { Topic } from '../components/Topic';

/*
 * To render multiple files, it is enough to return an array of "File" components in the rendering component, like in following example.
 */
export default function ({ asyncapi }) {
  const channels = asyncapi.channels();

  return Object.entries(channels).map(([channelName, channel]) => {
    if (!channel.hasSubscribe()) return null;

    return (
      <File name={`${channelName}.yaml`}>
        {render(<Info asyncapi={asyncapi} />)}
        {render(`---\n`)}
        {render(<Topic channelName={channelName} channel={channel} />)}
        {render(`...\n`)}
      </File>
    );
  });
}

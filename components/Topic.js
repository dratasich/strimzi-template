import { stringify } from 'yaml'

/*
 * Configure a kafka topic
 *
 * Kubernetes resource: [KafkaTopic](https://strimzi.io/docs/operators/latest/configuring.html#type-KafkaTopicSpec-reference)
 */
export function Topic({ channelName, channel }) {
  // generate spec part of the k8s resource
  let config = {}
  try {
    config = channel.subscribe().bindings().kafka
  } catch (error) {
    console.log("Failed to get kafka object from bindings")
  }
  // set only when metadata.name is not a valid kubernetes resource name
  //config["topicName"] = channelName
  const spec = {"spec": config }

  // render
  return `apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: ${channelName}
  labels:
    strimzi.io/cluster: kafka
${stringify(spec)}`;
}

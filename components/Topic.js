import { stringify } from 'yaml'

/*
 * Configure a kafka topic
 *
 * Kubernetes resource: [KafkaTopic](https://strimzi.io/docs/operators/latest/configuring.html#type-KafkaTopicSpec-reference)
 */
export function Topic({ resourceName, channelName, channel }) {
  // generate spec part of the k8s resource
  // get config from kafka bindings of a channel (when available)
  let config = {}
  if (channel.subscribe().bindings().kafka)
    config = channel.subscribe().bindings().kafka
  // set only when metadata.name is not a valid kubernetes resource name
  const topicName = normalizeKafkaName(channelName)
  if (resourceName != topicName) {
    config["topicName"] = topicName
  }
  const spec = {"spec": config }

  // render
  return `apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: ${resourceName}
  labels:
    strimzi.io/cluster: kafka
${stringify(spec)}`;
}

/*
 * Modify a name to a valid Kafka topic name.
 */
export function normalizeKafkaName(name) {
  // https://github.com/apache/kafka/blob/0.10.2/core/src/main/scala/kafka/common/Topic.scala#L24
  // valid characters: [a-zA-Z0-9\\._\\-] (note that '/' is not supported as separator)
  // max length: 249
  let normalized = name.replace(/\//g, '.')
  if (normalized.lenth > 249)
    throw new Error(`Invalid kafka topic name. Length of 249 exceeded! Topic: '${normalized}'`)
  if (normalized.match(/[a-zA-Z0-9\\._\\-]*/g)[0] != normalized)
    throw new Error(`Invalid kafka topic name. Contains characters other than '[a-zA-Z0-9\\._\\-]'. Topic: '${normalized}'`)
  return normalized
}

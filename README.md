# strimzi-template

<!--
The good readme should be easy to navigate through, therefore remember to add `markdown-toc` to devDependencies of your template and generate a table of contents by using the following script `"generate:readme:toc": "markdown-toc -i README.md"`
-->

<!-- toc -->

- [Overview](#overview)
- [Technical requirements](#technical-requirements)
- [Specification requirements](#specification-requirements)
- [How to use the template](#how-to-use-the-template)
  * [CLI](#cli)
  * [Docker](#docker)

<!-- tocstop -->

## Overview

This template generates [strimzi kubernetes resources](https://strimzi.io/docs/operators/latest/configuring.html#schema_properties) for Kafka setup via [strimzi](https://strimzi.io/).

## Technical requirements

- 1.1.0 =< [Generator](https://github.com/asyncapi/generator/) < 2.0.0,
- Generator specific [requirements](https://github.com/asyncapi/generator/#requirements)

## Specification requirements

### Topics

- (required) channel = Kafka topic name
- (optional) channel.subscribe.bindings.kafka object for topic configuration (partitions, retention time, etc.)

```
channels:
  dev.gps.location.0:
    description: GPS events on Kafka
    subscribe:
      operationId: publishRawGpsLocationEvent
      bindings:
        kafka:
          partitions: 10
          replicas: 1
          config:
            retention.ms: 86400000  # 1 day
      message:
        $ref: '#/components/messages/gpsEvent'
```

## How to use the template

This template must be used with the AsyncAPI Generator. You can find all available options [here](https://github.com/asyncapi/generator/).

### CLI

```bash
npm install -g @asyncapi/generator
ag https://raw.githubusercontent.com/asyncapi/generator/v1.1.5/test/docs/dummy.yml ./ -o test/output --force-write --watch-template --debug
```

### Docker

```bash
docker run --rm -it \
-v ${PWD}/output:/app/output \
asyncapi/generator -o /app/output https://raw.githubusercontent.com/asyncapi/generator/v1.0.1/test/docs/dummy.yml https://github.com/asyncapi/template-for-generator-templates --force-write
```

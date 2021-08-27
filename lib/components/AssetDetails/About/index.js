import React from 'react';
import {View, Linking} from 'react-native';

import * as Styled from './styled';

import Pill from '@lib/components/Pill';

const About = ({asset}) => {
  const {blockExplorerLink} = asset.assetContract;
  const {
    discordUrl,
    instagramUsername,
    mediumUsername,
    telegramUrl,
    twitterUsername,
    externalUrl,
  } = asset.collection;

  return (
    <View>
      <Styled.Text>{asset.description}</Styled.Text>
      <Styled.Links
        contentContainerStyle={{paddingHorizontal: 7}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {blockExplorerLink && (
          <Pill
            text={'Etherscan'}
            onPress={() => Linking.openURL(blockExplorerLink)}
          />
        )}
        {externalUrl && (
          <Pill text={'Website'} onPress={() => Linking.openURL(externalUrl)} />
        )}
        {discordUrl && (
          <Pill text={'Discord'} onPress={() => Linking.openURL(discordUrl)} />
        )}
        {twitterUsername && (
          <Pill
            text={'Twitter'}
            onPress={() =>
              Linking.openURL(`https://twitter.com/${twitterUsername}`)
            }
          />
        )}
        {telegramUrl && (
          <Pill
            text={'Telegram'}
            onPress={() => Linking.openURL(telegramUrl)}
          />
        )}
        {mediumUsername && (
          <Pill
            text={'Medium'}
            onPress={() =>
              Linking.openURL(`https://medium.com/${mediumUsername}`)
            }
          />
        )}
        {instagramUsername && (
          <Pill
            text={'Instagram'}
            onPress={() =>
              Linking.openURL(`https://instagram.com/${instagramUsername}`)
            }
          />
        )}
      </Styled.Links>
    </View>
  );
};

export default About;

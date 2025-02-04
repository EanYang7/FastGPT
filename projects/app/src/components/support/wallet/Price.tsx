import React from 'react';
import { Box, CloseButton } from '@chakra-ui/react';
import { useSystemStore } from '@/web/common/system/useSystemStore';
import ReactDOM from 'react-dom';

import Markdown from '@/components/Markdown';

const Price = ({ onClose }: { onClose: () => void }) => {
  const { llmModelList, vectorModelList, audioSpeechModelList, whisperModel } = useSystemStore();

  const list = [
    {
      title: 'AI语言模型',
      describe: '',
      md: `
| 模型 | 输入价格(￥) | 输出价格(￥) |
| --- | --- | --- |
${llmModelList
  ?.map((item) => `| ${item.name} | ${item.inputPrice}/1k tokens | ${item.outputPrice}/1k tokens |`)
  .join('\n')}`
    },
    {
      title: '索引模型(文档训练 & 文档检索)',
      describe: '',
      md: `
| 模型 | 价格(￥) |
| --- | --- |
${vectorModelList?.map((item) => `| ${item.name} | ${item.inputPrice}/1k 字符 |`).join('\n')}
      `
    },
    {
      title: '语音播放',
      describe: '',
      md: `
| 模型 | 价格(￥) |
| --- | --- |
${audioSpeechModelList
  ?.map((item) => `| ${item.name} | ${item.inputPrice}/1k 字符 | - |`)
  .join('\n')}`
    },
    ...(whisperModel
      ? [
          {
            title: '语音输入',
            describe: '',
            md: `
| 模型 | 价格(￥) |
| --- | --- |
| ${whisperModel.name} | ${whisperModel.inputPrice}/分钟 | - |`
          }
        ]
      : [])
  ];

  return ReactDOM.createPortal(
    <Box position={'fixed'} top={0} right={0} bottom={0} left={0} zIndex={99999} bg={'white'}>
      <CloseButton
        position={'absolute'}
        top={'10px'}
        right={'20px'}
        bg={'myGray.200'}
        w={'30px'}
        h={'30px'}
        borderRadius={'50%'}
        onClick={onClose}
      />
      <Box overflow={'overlay'} h={'100%'}>
        <Box py={[0, 10]} px={5} mx={'auto'} maxW={'1200px'}>
          {list.map((item) => (
            <Box
              display={['block', 'flex']}
              key={item.title}
              w={'100%'}
              mb={4}
              pb={6}
              _notLast={{
                borderBottom: '1px',
                borderBottomColor: 'borderColor.high'
              }}
            >
              <Box fontSize={'xl'} fontWeight={'bold'} mb={1} flex={'1 0 0'}>
                {item.title}
              </Box>
              <Box w={['100%', '410px']}>
                <Markdown source={item.md}></Markdown>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>,
    // @ts-ignore
    document.querySelector('body')
  );
};

export default Price;

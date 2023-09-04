import { Editor } from '@toast-ui/react-editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import 'prismjs/themes/prism.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'

import Prism from 'prismjs'

interface Props {
  content: string
  editorRef: React.MutableRefObject<any>
}

const TuiEditor = ({ content = '', editorRef }: Props) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ]

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ' '} // 글 수정 시 사용
          initialEditType="markdown" // wysiwyg & markdown
          previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'} // tab, vertical
          hideModeSwitch={true}
          height="500px"
          //   language="ko-KR"
          theme={'dark'} // '' & 'dark'
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut={true}
          //plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
    </>
  )
}

export default TuiEditor

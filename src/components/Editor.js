import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/twilight.css';
import 'codemirror/theme/vibrant-ink.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/cobalt.css';

// import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sql/sql';

import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import ACTIONS from '../Actions';

const Editor = ({
  socketRef,
  roomId,
  onCodeChange,
  changeLanguage,
  changeTheme,
}) => {
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: { name: changeLanguage, json: true },
          theme: changeTheme,
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          matchBrackets: true,
        }
      );

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();

    return () => {
      editorRef.current.toTextArea();
    };
  }, [changeLanguage, changeTheme]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return <textarea id='realtimeEditor'></textarea>;
};

export default Editor;

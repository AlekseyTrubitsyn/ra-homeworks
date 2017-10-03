'use strict';

function MessageHistory({ list }) {
  if (!list || list.length == 0) return null;

  let messages = list.map( item => {
    let { text, time } = item;
    let message = {
       text,
       time
    }

    switch (item.type) {
      case 'message':
        return <Message key={ item.id } from={ item.from } message={ message }/>;

      case 'response':
        return <Response key={ item.id } from={ item.from } message={ message }/>;

      case 'typing':
        return <Typing key={ item.id } from={ item.from } message={ message }/>;

      default:
        return null;
    }
  });

   return (
     <ul>
       { messages }
     </ul>
   );
 }

MessageHistory.defaultProps = {
  list: []
}

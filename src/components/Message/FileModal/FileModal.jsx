// import React, { Component } from 'react';
// import mime from 'mime-types';
// import { Modal, Input, Button, Icon } from 'semantic-ui-react';

// export class FileModal extends Component {
//     state = {
//         file: null,
//         authorized: ['image/jpeg', 'image/png']
//     }

//     addFile = event => {
//         const file = event.target.files[0];

//         if (file) {
//             this.setState({ file });
//         }
//     }

//     isAuthorized = fileName => this.state.authorized.includes(mime.lookup(fileName));

//     clearFile = () => this.setState({ file: null });

//     sendFile = () => {
//         const { file } = this.state;
//         const { uploadFile, closeModal } = this.props;
//         const { isAuthorized, clearFile } = this;

//         if (file !== null) {
//             if (isAuthorized(file.name)) {
//                 const metadata = { contentType: mime.lookup(file.name) };
//                 uploadFile(file, metadata);
//                 closeModal();
//                 clearFile();
//             }
//         }
//     }

//     render() {
//         const { modal, closeModal } = this.props;
//         const { addFile, sendFile } = this;

//         return (
//             <Modal
//                 basic
//                 open={modal}
//                 onClose={closeModal}
//             >
//                 <Modal.Header>Select an Image File</Modal.Header>
//                 <Modal.Content>
//                     <Input
//                         fluid
//                         label='File types: jpg, png'
//                         name='file'
//                         type='file'
//                         onChange={addFile}
//                     />
//                 </Modal.Content>
//                 <Modal.Actions>
//                     <Button
//                         color='green'
//                         inverted
//                         onClick={sendFile}
//                     >
//                         <Icon name='checkmark' /> Send
//                     </Button>
//                     <Button
//                         color='red'
//                         inverted
//                         onClick={closeModal}
//                     >
//                         <Icon name='remove' /> Cancel
//                     </Button>
//                 </Modal.Actions>
//             </Modal>
//         );
//     }
// }

// export default FileModal;

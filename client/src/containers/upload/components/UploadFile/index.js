import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import * as PT from 'prop-types';

import * as Q from '../../query.gql';

class UploadFile extends Component {
  static propTypes = {
    mutation: PT.object,
    multiple: PT.bool
  };
  onChange(e, uploadFile) {
    console.log(e.nativeEvent, uploadFile);
    const { nativeEvent } = e;
    const {
      target: { validity, files }
    } = nativeEvent;

    if (validity.valid) {
      if (files.length > 1) {
        uploadFile({ variables: { files } });
      } else {
        const file = files[0];
        uploadFile({ variables: { file } });
      }
    }
  }

  render() {
    const { mutation, multiple } = this.props;
    return (
      <Mutation
        mutation={mutation}
        update={(proxy, mutationResult) => {
          // const data = proxy.readQuery({ query: Q.uploads });
          // const {
          //   data: { singleUpload: newUpload }
          // } = mutationResult;
          // data.uploads.push(newUpload);
          // proxy.writeQuery({ query: Q.uploads, data });
        }}>
        {uploadFile => {
          return <input type="file" multiple={multiple} required onChange={e => this.onChange(e, uploadFile)} />;
        }}
      </Mutation>
    );
  }
}

export default UploadFile;

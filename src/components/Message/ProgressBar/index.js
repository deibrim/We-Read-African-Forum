import React from 'react';
import { Progress } from 'semantic-ui-react';

const ProgressBar = ({ uploadState, percentUploaded }) => {
    if (uploadState === 'uploading') {
        return (
            <Progress
                className='progress__bar'
                percent={percentUploaded}
                progress
                indicating
                size='medium'
                inverted
            />
        );
    }
    return null;
};

export default ProgressBar;

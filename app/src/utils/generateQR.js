import React from 'react';
import qr from 'qr-image';

export const renderQrImage = (string, width) => (
    <div>
        <embed style={{width: width}} src={`data:image/svg+xml,${encodeURIComponent(qr.imageSync(string, { type: 'svg' }))}`} />
    </div>
);

import React from 'react';

export default {
  title: 'Demo',
};

export const StaticText = () => {
  return (
    <div>
      This text is static and should <strong>not</strong> be ignored: <span style={{color: 'red'}} className="ignore-this">1594565350172</span>
    </div>
  )
}

StaticText.story = {
  name: 'Static text without ignore region',
}
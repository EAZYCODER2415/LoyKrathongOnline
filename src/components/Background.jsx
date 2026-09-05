import React from 'react';

const Background = () => {
  return (
    <div className="background">
      <div className="top">
        <div className="moon">
          <img alt="moon" src="/images/moon.png" />
        </div>
        <div className="title-group">
          <div className="title">
            <img
              src="https://png.pngtree.com/png-vector/20221106/ourmid/pngtree-loy-krathong-festival-calligraphy-lotus-flower-full-moon-lantern-creative-decorations-png-image_6417331.png"
              alt="Loy Krathong Festival Font PNG, 10+ Loy Krathong Festival Text Effect PSD  Download"
            />
          </div>
          <div className="stats">
            <h1 id="krathong-stats">0 lanterns released, </h1>
            <h1>0 krathongs created</h1>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="lanes">
          <div id="lane-a" className="lane-a"></div>
          <div id="lane-b" className="lane-b"></div>
          <div id="lane-c" className="lane-c"></div>
        </div>
        <div className="bridge">
          <img
            className="bridge"
            src="/images/bridge.png"
            alt="bridge"
          />
        </div>
        <div className="decor">
          <img src="/images/lotus1.png" alt="decor" style={{ left: '25px' }} />
          <img src="/images/cattail.png" alt="decor" style={{ left: '175px' }} />
          <img src="/images/lotus1.png" alt="decor" style={{ left: '325px' }} />
          <img src="/images/cattail.png" alt="decor" style={{ right: '1px' }} />
          <img src="/images/lotus1.png" alt="decor" style={{ right: '140px' }} />
          <img src="/images/lotus1.png" alt="decor" style={{ right: '315px' }} />
        </div>
      </div>
    </div>
  );
};

export default Background;
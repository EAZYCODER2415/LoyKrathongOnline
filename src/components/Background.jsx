import React from 'react';

const Background = () => {
  const imageBase = '/dist/images/';

  return (
    <div className="background">
      <div className="top">
        <div className="moon">
          <img alt="moon" src={`${imageBase}moon.png`} />
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
            src={`${imageBase}bridge.png`}
            alt="bridge"
          />
        </div>
        <div className="decor" aria-hidden="true">
          <img className="decor-lotus lotus-one" src={`${imageBase}lotus1.png`} alt="" />
          <img className="decor-cattail cattail-one" src={`${imageBase}cattail.png`} alt="" />
          <img className="decor-lotus lotus-two" src={`${imageBase}lotus1.png`} alt="" />
          <img className="decor-cattail cattail-two" src={`${imageBase}cattail.png`} alt="" />
          <img className="decor-lotus lotus-three" src={`${imageBase}lotus1.png`} alt="" />
          <img className="decor-cattail cattail-three" src={`${imageBase}cattail.png`} alt="" />
          <img className="decor-lotus lotus-four" src={`${imageBase}lotus1.png`} alt="" />
          <img className="decor-cattail cattail-four" src={`${imageBase}cattail.png`} alt="" />
          <img className="decor-lotus lotus-five" src={`${imageBase}lotus1.png`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Background;
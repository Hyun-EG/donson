import React from "react";
import MapContainer from "./MapContainer";

const RenBox = () => {
  return (
    <div className="flex flex-col">
      <MapContainer
        src="/images/mapleMap/200.webp"
        name="숨겨진 호숫가"
        start={200}
        end={210}
        level={209}
        unit={36}
        exp="783"
      />
      <MapContainer
        src="/images/mapleMap/210-215.webp"
        name="동산 입구"
        start={210}
        end={215}
        level={210}
        unit={33}
        exp="982"
      />
      <MapContainer
        src="/images/mapleMap/215-220.webp"
        name="거대한 꼬리"
        start={215}
        end={220}
        level={219}
        unit={30}
        exp="1,001"
      />
      <MapContainer
        src="/images/mapleMap/220-225.webp"
        name="닭이 뛰노는 곳3"
        start={220}
        end={225}
        level={221.5}
        unit={38}
        exp="1,335"
      />
      <MapContainer
        src="/images/mapleMap/225-230.webp"
        name="물과 햇살의 숲"
        start={225}
        end={230}
        level={230.5}
        unit={33}
        exp="1,376"
      />
      <MapContainer
        src="/images/mapleMap/225-230(2).webp"
        name="동굴 아랫길 깊디 깊은 곳"
        start={225}
        end={230}
        level={238.5}
        unit={28}
        exp="1,239"
      />

      <MapContainer
        src="/images/mapleMap/230-235.webp"
        name="그림자가 춤추는 곳2"
        start={230}
        end={235}
        level={239}
        unit={37}
        exp="1,797"
      />
      <MapContainer
        src="/images/mapleMap/240-245-250-255.webp"
        name="별이 삼켜진 심해6"
        start={240}
        end={245}
        level={251}
        unit={39}
        exp="2,293"
      />
      <MapContainer
        src="/images/mapleMap/240-245-2.webp"
        name="끝없이 추락하는 심해 3"
        start={240}
        end={245}
        level={248}
        unit={38}
        exp="2,172"
      />
      <MapContainer
        src="/images/mapleMap/240-245-250-255.webp"
        name="별이 삼켜진 심해 6"
        start={245}
        end={255}
        level={251}
        unit={39}
        exp="2,432"
      />
      <MapContainer
        src="/images/mapleMap/255-260.webp"
        name="세계가 끝나는곳 1-9"
        start={255}
        end={260}
        level={263}
        unit={34}
        exp="3,042"
      />
      <MapContainer
        src="/images/mapleMap/255-260-2.webp"
        name="고통의 미궁 내부 4"
        start={255}
        end={260}
        level={256}
        unit={34}
        exp="2,615"
      />
      <MapContainer
        src="/images/mapleMap/260-264.webp"
        name="세르니움 동쪽 성벽 3"
        start={260}
        end={264}
        level={261}
        unit={38}
        exp="7,981"
      />
      <MapContainer
        src="/images/mapleMap/260-264-2.webp"
        name="왕립 도서관 제4구역"
        start={260}
        end={264}
        level={261}
        unit={34}
        exp="7,141"
      />
      <MapContainer
        src="/images/mapleMap/260-264-rice.webp"
        name="왕립 도서관 제5구역"
        start={260}
        end={264}
        level={261}
        unit={34}
        exp="7,141"
      />
      <MapContainer
        src="/images/mapleMap/264-266.webp"
        name="불타는 왕립 도서관 제 3구역"
        start={264}
        end={266}
        level={264}
        unit={39}
        exp="8,556"
      />
      <MapContainer
        src="/images/mapleMap/264-266.webp"
        name="무법자들이 지배하는 황야4"
        start={266}
        end={268}
        level={265}
        unit={39}
        exp="9,626"
      />
      <MapContainer
        src="/images/mapleMap/268-270.webp"
        name="종착지 없는 횡단열차3"
        start={268}
        end={270}
        level={268}
        unit={38}
        exp="9,783"
      />
    </div>
  );
};

export default RenBox;

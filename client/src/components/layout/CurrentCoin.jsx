import React from "react";
import styled from "styled-components";

const CurrentCoinBlock = styled.section`
	ul {
		padding: 16px 0;
		li {
			gap: 8px;
			&.TA_Right {
				.coin {
					width: 20px;
				}
			}
		}
	}
`;

const CurrentCoin = () => {
	return (
		<CurrentCoinBlock className="currentCoin">
			<ul className="DefaultWidth FL_SB">
				<li className="TA_Left FontMenuTitle FL_Center">
					<span>Level.</span>
					<span>변수</span>
				</li>
				<li className="TA_Right FontBody FL_Center">
					<span className="coin">
						<img src="../src/assets/image/coin.svg" alt="코인" />
					</span>
					<span>코인개수</span>
				</li>
			</ul>
		</CurrentCoinBlock>
	);
};

export default CurrentCoin;

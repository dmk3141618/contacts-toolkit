import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '~/common/store';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '~/common/state/counter';
import styled, {css} from 'styled-components';

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  min-height: 40rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > button {
    margin-left: 0.4rem;
    margin-right: 0.8rem;
  }

  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }
`;

const ButtonBaseStyle = css`
  appearance: none;
  background: none;
  font-size: 3.2rem;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  outline: none;
  border: 2px solid transparent;
  color: rgb(112, 76, 182);
  padding-bottom: 0.4rem;
  cursor: pointer;
  background: rgba(112, 76, 182, 0.1);
  border-radius: 0.2rem;
  transition: all 0.15s;

  &:hover,
  &:focus {
    border: 0.2rem solid rgba(112, 76, 182, 0.4);
  }

  &:active {
    background-color: rgba(112, 76, 182, 0.2);
  }
`;

const Button = styled.button.attrs<{ariaLabel?: string}>(({ariaLabel}) => ({ariaLabel}))<{
  ariaLabel?: string;
}>`
  ${ButtonBaseStyle};
`;

const AsyncButton = styled.button`
  ${ButtonBaseStyle};

  position: relative;
  &:after {
    content: '';
    background-color: rgba(112, 76, 182, 0.15);
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    transition: width 1s linear, opacity 0.5s ease 1s;
  }

  &:active:after {
    width: 0;
    opacity: 1;
    transition: 0s;
  }
`;

const ValueSpan = styled.span`
  font-size: 7.8rem;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  margin-top: 0.2rem;
  font-family: 'Courier New', Courier, monospace;
`;

const IncrementAmountInput = styled.input`
  font-size: 3.2rem;
  padding: 0.2rem;
  width: 6.4rem;
  text-align: center;
  margin-right: 0.4rem;
`;

type Props = RouteComponentProps;
// interface Props extends RouteComponentProps {}
function CounterPage({}: Props) {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <PageWrap>
      <Row>
        <Button ariaLabel="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </Button>
        <ValueSpan>{count}</ValueSpan>
        <Button ariaLabel="Increment value" onClick={() => dispatch(increment())}>
          +
        </Button>
      </Row>
      <Row>
        <IncrementAmountInput
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <Button onClick={() => dispatch(incrementByAmount(incrementValue))}>Add Amount</Button>
        <AsyncButton onClick={() => dispatch(incrementAsync(incrementValue))}>
          Add Async
        </AsyncButton>
        <Button onClick={() => dispatch(incrementIfOdd(incrementValue))}>Add If Odd</Button>
      </Row>
    </PageWrap>
  );
}

export default React.memo(CounterPage);

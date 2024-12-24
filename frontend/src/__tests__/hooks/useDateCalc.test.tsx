import '@testing-library/jest-dom';
import { renderHook, cleanup } from '@testing-library/react';
import '../util/matchMedia';
import useDateCalc from '../../hooks/useDateCalc';

describe('useDateCalc testing', () => {
  afterEach(() => {
    cleanup();
  });

  it('Returns null when difference is less than one day', () => {
    const { result } = renderHook(() => useDateCalc(new Date()));

    expect(result.current).toBe(null);
  });

  it('Returns a tuple with the second element being "days" if the date difference is between 1-6 days', () => {
    const date = new Date();
    date.setDate(new Date().getDate() - 2);
    const { result } = renderHook(() => useDateCalc(date));

    expect(result.current).toEqual([2, 'days']);
  });

  it('Returns a tuple with the second element being "weeks" if the date difference is 7-29 days', () => {
    const date = new Date();
    date.setDate(new Date().getDate() - 19);
    const { result } = renderHook(() => useDateCalc(date));

    expect(result.current).toEqual([2, 'weeks']);
  });

  it('Returns a tuple with the second element being "months" if the date difference is 30+ days', () => {
    const date = new Date();
    date.setDate(new Date().getDate() - 61);
    const { result } = renderHook(() => useDateCalc(date));

    expect(result.current).toEqual([2, 'months']);
  });
});

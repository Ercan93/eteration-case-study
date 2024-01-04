import { render, fireEvent,screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const totalPage = 10;
  const onChangePage = jest.fn();

  it('renders without crashing', () => {
    render(<Pagination totalPage={totalPage} onChangePage={onChangePage} />);
  });

  it('displays the correct number of pages', () => {
    render(<Pagination totalPage={totalPage} onChangePage={onChangePage} />);
    expect(screen.getAllByText((content, node) => content && content.match(/\b\d+\b/)).length).toBe(5);
  });

  it('calls onChangePage when a page is clicked', () => {
    render(<Pagination totalPage={totalPage} onChangePage={onChangePage} />);
    fireEvent.click(screen.getByText('2'));
    expect(onChangePage).toHaveBeenCalledWith(2);
  });

  it('displays the next set of pages when "..." is clicked', () => {
    render(<Pagination totalPage={totalPage} onChangePage={onChangePage} />);
    fireEvent.click(screen.getByText('...'));
    expect(screen.getAllByText((content, node) => content && content.match(/\b\d+\b/)).length).toBe(5);
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('displays the previous set of pages when "Prev" is clicked', () => {
    render(<Pagination totalPage={totalPage} onChangePage={onChangePage} />);
    fireEvent.click(screen.getByText('...'));
    fireEvent.click(screen.getByText('Prev'));
    expect(screen.getAllByText((content, node) => content && content.match(/\b\d+\b/)).length).toBe(5);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('displays the next page when "Next" is clicked', () => {
    render(<Pagination totalPage={totalPage} onChangePage={onChangePage} />);
    fireEvent.click(screen.getByText('Next'));
    expect(onChangePage).toHaveBeenCalledWith(2);
  });
});
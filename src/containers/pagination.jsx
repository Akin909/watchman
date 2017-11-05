import React, { Component } from 'react';

import PageLi from './@atoms/pageLi';
import PageLink from './@atoms/pageLink';
import Pages from './@atoms/pages';

type Props = {
  initialPage: number,
};

type State = {
  pager: {
    totalItems: number,
    currentPage: number,
    pageSize: number,
    totalPages: number,
    endPage: number,
    startPage: number,
    startIndex: number,
    endIndex: number,
    pages: any[],
  },
};

export default class Pagination extends Component<Props, State> {
  static defaultProps = {
    initialPage: 1,
  };

  state = {
    pager: {},
  };

  componentWillMount() {
    if (this.props.data && this.props.data.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    //Reset page if items array has changed
    if (this.props.data !== prevProps.data) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page: number) {
    const { data } = this.props;
    let { pager } = this.state;

    if (page < 1 || page > pager.totalPages) {
      return;
    }
    pager = this.getPager(data.length, page);

    const pageOfItems = data.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({ pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  //default to first page, default pageSize is 10
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    //calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 1;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const pages = Array.from(
      { length: endIndex + 1 },
      (e, i) => i + startIndex
    );

    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      endPage,
      startPage,
      startIndex,
      endIndex,
      pages,
    };
  }
  render() {
    const { pager: { pages }, pager } = this.state;
    console.log('this.state.pager: ', this.state.pager);
    return (
      <Pages>
        <PageLi>
          <PageLink onClick={() => this.setPage(1)}>First</PageLink>
        </PageLi>
        <PageLi>
          <PageLink onClick={() => this.setPage(pager.currentPage - 1)}>
            Previous
          </PageLink>
        </PageLi>
        {pager.pages.map((page, index) => (
          <PageLi>
            <PageLink onClick={() => this.setPage(page)}>{index + 1}</PageLink>
          </PageLi>
        ))}
        <PageLi>
          <PageLink onClick={() => this.setPage(pager.currentPage + 1)}>
            Next
          </PageLink>
        </PageLi>
        <PageLi>
          <PageLink onClick={() => this.setPage(pager.totalPages)}>
            Last
          </PageLink>
        </PageLi>
      </Pages>
    );
  }
}

import React, { Component } from 'react';

import PageNumber from 'components/@molecules/pageNumber';
import Pages from 'components/@atoms/pages';

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

  onClick = (page: number) => (e: Event) => {
    this.setPage(page);
  };

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
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 12) {
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
        endPage = totalPages;
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
      { length: startPage + 10 },
      (e, i) => i + startPage
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

  renderPages = (page, i) => (
    <PageNumber key={i} page={page} index={i} onClick={this.onClick} />
  );

  render() {
    const { pager } = this.state;
    return (
      <Pages>
        <PageNumber onClick={this.onClick} page={1}>
          First
        </PageNumber>
        <PageNumber page={pager.currentPage - 1} onClick={this.onClick}>
          Previous
        </PageNumber>
        {pager.pages.map((page, i) => this.renderPages(page, i))}
        <PageNumber page={pager.currentPage + 1} onClick={this.onClick}>
          Next
        </PageNumber>
        <PageNumber onClick={this.onClick} page={pager.totalPages}>
          Last
        </PageNumber>
      </Pages>
    );
  }
}

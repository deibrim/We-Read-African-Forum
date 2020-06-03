import React from "react";
import "./Pagination.scss";

export default class Pagination extends React.Component {
  state = {
    firstThreeArray: [1],
    lastNumber: "",
    showEllipis: true
  };
  componentDidMount() {
    if (this.props.totalPages <= 5) {
      var fArray = [];

      for (var i = 1; i <= this.props.totalPages; i++) {
        fArray.push(i);
      }

      this.setState({ firstThreeArray: fArray });
    } else {
      if (this.props.currentPage < 3) {
        this.setState({ firstThreeArray: [1, 2, 3] });
      } else {
        var fArray = [];
        var index = 1;
        for (let j = this.props.currentPage; j >= 0; j--) {
          fArray.push(j);
          if (index === 3) {
            break;
          }
          index++;
        }

        fArray.reverse();
        this.setState({ firstThreeArray: fArray });
      }
      this.setState({ lastNumber: this.props.totalPages });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalPages <= 5) {
      var fArray = [];

      for (var i = 1; i <= nextProps.totalPages; i++) {
        fArray.push(i);
      }
      this.setState({ firstThreeArray: fArray });
    } else {
      if (
        this.props.currentPage !== nextProps.currentPage ||
        this.props.totalPages !== nextProps.totalPages
      ) {
        if (nextProps.currentPage < 3) {
          this.setState({ firstThreeArray: [1, 2, 3] });
        } else {
          var fArray = [];
          fArray.push(nextProps.currentPage - 1);
          fArray.push(nextProps.currentPage);
          if (nextProps.currentPage + 1 < nextProps.totalPages) {
            fArray.push(nextProps.currentPage + 1);
          }
          if (
            nextProps.currentPage == nextProps.totalPages - 2 ||
            nextProps.currentPage == nextProps.totalPages - 1 ||
            nextProps.currentPage == nextProps.totalPages
          ) {
            this.setState({ showEllipis: false });
          } else {
            this.setState({ showEllipis: true });
          }
          this.setState({ firstThreeArray: fArray });
        }
        this.setState({ lastNumber: nextProps.totalPages });
      }
    }
  }
  prev = () => {
    if (this.props.currentPage > 1) {
      this.props.changeCurrentPage(this.props.currentPage - 1);
    }
  };
  next = () => {
    if (this.props.currentPage < this.props.totalPages) {
      this.props.changeCurrentPage(this.props.currentPage + 1);
    }
  };
  changeCurrentPage = no => {
    this.props.changeCurrentPage(no);
  };
  showEllipsis = () => {
    if (this.state.showEllipis) {
      return (
        <a>
          <li>...</li>
        </a>
      );
    }
  };
  isactive = currentPage => {
    if (this.props.currentPage == currentPage) {
      return true;
    }
    return false;
  };
  showLastPagi = () => {
    if (this.props.currentPage !== this.props.totalPages) {
      return (
        <a
          className={this.isactive(this.props.totalPages) ? "is-active" : ""}
          onClick={() => {
            this.changeCurrentPage(this.props.totalPages);
          }}
        >
          <li>{this.props.totalPages}</li>
        </a>
      );
    }
  };
  showPrev = () => {
    if (this.props.currentPage != 1) {
      return (
        <a onClick={this.prev}>
          <li className="control-arrow"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.969498 9.66757L8.24967 17.7235C8.58285 18.0922 9.12302 18.0922 9.4562 17.7235C9.78934 17.3548 9.78934 16.7571 9.4562 16.3884L2.77927 9L9.4562 1.61162C9.78934 1.24294 9.78934 0.645206 9.4562 0.276524C9.28963 0.0921593 9.07125 0 8.85292 0C8.63458 0 8.4162 0.0921593 8.24963 0.276524L0.969457 8.33248C0.636319 8.70116 0.636319 9.29889 0.969498 9.66757Z" fill="#303030" />
          </svg> <span>Previous Page</span></li>
        </a>
      );
    }
  };
  showNext = () => {
    if (this.props.currentPage < this.props.totalPages) {
      return (
        <a onClick={this.next}>
          <li className="control-arrow"><span>Next Page</span> <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.73656 8.33243L1.45638 0.276477C1.1232 -0.0921592 0.583031 -0.0921591 0.249853 0.276477C-0.0832842 0.645159 -0.0832842 1.24289 0.249853 1.61157L6.92679 9L0.249854 16.3884C-0.083283 16.7571 -0.083283 17.3548 0.249854 17.7235C0.416423 17.9078 0.634801 18 0.853139 18C1.07148 18 1.28986 17.9078 1.45642 17.7235L8.7366 9.66752C9.06974 9.29884 9.06974 8.70111 8.73656 8.33243Z" fill="#303030" />
          </svg></li>
        </a>
      );
    }
  };

  render() {
    return (
      <div className={this.props.theme + " pagination"}>
        <ul>
          {this.showPrev()}
          {this.props.totalPages <= 5 ? (
            this.state.firstThreeArray.map((no, index) => {
              return (
                <a
                  key={index}
                  className={this.isactive(no) ? "is-active" : ""}
                  onClick={() => {
                    this.changeCurrentPage(no);
                  }}
                >
                  <li>{no}</li>
                </a>
              );
            })
          ) : (
              <React.Fragment>
                {this.state.firstThreeArray.map((no, index) => {
                  return (
                    <a
                      key={index}
                      className={this.isactive(no) ? "is-active" : ""}
                      onClick={() => {
                        this.changeCurrentPage(no);
                      }}
                    >
                      <li>{no}</li>
                    </a>
                  );
                })}
                {this.showEllipsis()}

                {this.showLastPagi()}
              </React.Fragment>
            )}
          {this.showNext()}
        </ul>
      </div>
    );
  }
}
Pagination.defaultProps = {
  theme: "default",
  currentPage: 1,
  totalPages: 15
};

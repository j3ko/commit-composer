import { Alert } from 'antd';
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheckCircle, BsExclamationTriangle, BsXOctagon } from 'react-icons/bs';
import withStyles from 'react-jss';
import { connect } from 'react-redux';
import { AppState, EditorState, ValidationResult } from 'state';

const styles = {
  root: {},
};

export interface OwnProps {}
export interface ReduxProps {
  editor: EditorState;
}
export interface DispatchProps {}
type Props = OwnProps & ReduxProps & DispatchProps;
export interface State {}

declare type ValidationType = 'success' | 'warning' | 'error';

class EditorValidationComponent extends React.Component<Props, State> {
  getAlertType(val: ValidationResult): ValidationType {
    let result: ValidationType = 'success';
    result = val.warnings && val.warnings.length ? 'warning' : result;
    result = !val.valid ? 'error' : result;
    return result;
  }

  getAlertDescription(val: ValidationResult): JSX.Element {
    return (
      <>
        {val.errors?.map((e) => (
          <span key={e.name}>
            <BsXOctagon /> {e.name} - {e.message}
            <br />
          </span>
        ))}
        {val.warnings?.map((w) => (
          <span key={w.name}>
            <BsExclamationTriangle /> {w.name} - {w.message}
            <br />
          </span>
        ))}
      </>
    );
  }

  render(): JSX.Element {
    const { editor } = this.props;
    const { validationResult } = editor;

    let result = (
      <Alert
        message={'Unable to validate message'}
        description={' '}
        type={'error'}
        icon={<BsXOctagon />}
        showIcon
      />
    );

    if (validationResult) {
      const description = this.getAlertDescription(validationResult);
      const alertType = this.getAlertType(validationResult);
      const typeMap = {
        success: {
          message: 'Valid',
          icon: <BsCheckCircle />,
        },
        error: {
          message: 'Error',
          icon: <BsXOctagon />,
        },
        warning: {
          message: 'Warning',
          icon: <BsExclamationTriangle />,
        },
      };

      result = (
        <Alert
          message={typeMap[alertType].message}
          description={description}
          type={alertType}
          icon={
            editor.loading ? (
              <AiOutlineLoading3Quarters className="spin" />
            ) : (
              typeMap[alertType].icon
            )
          }
          showIcon
        />
      );
    }

    return result;
  }
}

function mapStateToProps(state: AppState): ReduxProps {
  const { editor } = state;
  return { editor };
}

export default connect<ReduxProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  null,
)(withStyles(styles)(EditorValidationComponent));

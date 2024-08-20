import theme from "./formModal.theme.module.scss";

type FormModalProps = {
  handleClose: () => void;
  avatar: string;
};

function FormModal({ handleClose, avatar }: FormModalProps) {
  return (
    <div className={theme.modalBackdrop}>
      <div className={theme.modal}>
        <img className={theme.modalImg} src={avatar} alt="profile pic" />
        <div className={theme.modalBody}>
          <div className={theme.modalName}>Juan</div>
          <div className={theme.modalRole}>CEO</div>
          <div className={theme.skills}>
            <ul>
              <li key={"skill1"}>{"skill 1"}</li>
              <li key={"skill2"}>{"skill 2"}</li>
              <li key={"skill3"}>{"skill 3"}</li>
            </ul>
          </div>
          <button className={theme.closeBtn} onClick={() => handleClose()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormModal;

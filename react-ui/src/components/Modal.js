import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

/**
 * @param {string} 																		title: The title text for the modal.
 * @param {object[{title: string, content: object}]}	content: The content to be shown on the modal.
 * @param {object[{title: string, action: function, disabled: boolean}]}	actions: The action the modal provides
*/
const Modal = ({title, content, actions, open, setOpen}) => {

	const handleClose = () => {
		setOpen(false);
	}

	return (
		<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{title}</DialogTitle>
				{content.map((content, index) =>
					<DialogContent key={index}>
						<Divider />
						<DialogTitle>{content.title}</DialogTitle>
						{content.content}
					</DialogContent>
				)}
			<DialogActions>
				{actions.map((action, index) =>
					<Button onClick={action.action} key={index} disabled={action.disabled}>{action.title}</Button>
				)}
			</DialogActions>
		</Dialog>
	);

}

export default Modal;
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * @param {string} 																		title: The title text for the modal.
 * @param {object[{title: string, content: object}]}	content: The content to be shown on the modal.
 * @param {object[{title: string, action: function, disabled: boolean}]}	actions: The action the modal provides
*/
const Modal = ({title, warning, content, actions, open, setOpen}) => {

	if (content == null || actions == null)
		return null;

	const handleClose = () => {
		setOpen(false);
	}

	return (
		<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{title}</DialogTitle>

				<DialogContent>
				{content.map((content, index) =>
					<Box key={index}>
						<Divider />
						<Typography variant="h6" sx={{display: 'flex', justifyContent: 'center'}}>
							{content.title}
						</Typography>
						<Box sx={{display: 'flex',justifyContent: 'center'}}>
							{content.content}
						</Box>
					</Box>
				)}
				</DialogContent>
				<Box sx={{display: 'flex',justifyContent: 'center'}}>
					{warning}
				</Box>

			<DialogActions sx={{display: 'flex',justifyContent: 'space-between'}}>
				{actions.map((action, index) =>
					<Button key={index} onClick={action.action} disabled={action.disabled}>{action.title}</Button>
				)}
			</DialogActions>

		</Dialog>
	);

}

export default Modal;
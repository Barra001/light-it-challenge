import React, {type ReactNode} from 'react';
import theme from './templateName.theme.module.scss';

type TemplateNameProps = {
	children: ReactNode;
};

function TemplateName({children}: TemplateNameProps) {
	return (
		<div className={theme.mainContainer}>
			{children}
		</div>
	);
}

export default TemplateName;

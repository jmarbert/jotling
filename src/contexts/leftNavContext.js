import React, { createContext, useState, useCallback, useRef, useEffect } from 'react';

export const LeftNavContext = createContext();

// CONSTANTS
const DEFAULT_WIDTH = 12;

const LeftNavContextProvider = (props) => {
	// STATE
	const [docStructure, setDocStructure] = useState({});
	const [linkStructure, setLinkStructure] = useState({});
	const [project, setProject] = useState({ tempPath: '', jotsPath: '' });
	const [navData, setNavData] = useState({
		currentDoc: '',
		currentTempPath: '',
		currentTab: 'draft',
		lastClicked: { type: '', id: '' },
		editFile: '',
		parentFolders: [],
	});
	const [editorWidth, setEditorWidth] = useState({
		leftNav: DEFAULT_WIDTH,
		leftIsPinned: true,
		rightNav: DEFAULT_WIDTH,
		rightIsPinned: true,
		editorMaxWidth: 60,
	});
	const [editorArchives, setEditorArchives] = useState({});

	// REFS
	const linkStructureRef = useRef(linkStructure);

	useEffect(() => {
		linkStructureRef.current = linkStructure;
	}, [linkStructure]);

	// Resets the width of the side nav bars
	const resetNavWidth = useCallback(
		(whichNav) => {
			setEditorWidth({ ...editorWidth, [whichNav]: DEFAULT_WIDTH });
		},
		[editorWidth]
	);

	return (
		<LeftNavContext.Provider
			value={{
				docStructure,
				setDocStructure,
				navData,
				setNavData,
				project,
				setProject,
				linkStructure,
				setLinkStructure,
				editorWidth,
				setEditorWidth,
				resetNavWidth,
				editorArchives,
				setEditorArchives,
				linkStructureRef,
			}}>
			{props.children}
		</LeftNavContext.Provider>
	);
};

export default LeftNavContextProvider;

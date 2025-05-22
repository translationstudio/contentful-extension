/*
Contentful - translationstudio extension
Copyright (C) 2025 I-D Media GmbH, idmedia.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, see https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*/
import React, { useCallback, useState, useEffect } from "react";
import { PageAppSDK } from "@contentful/app-sdk";
import { Heading, Form, Button, Flex, Caption, SectionHeading, TextLink, Textarea, Paragraph } from "@contentful/f36-components";
import { css } from "emotion";
import { useSDK } from "@contentful/react-apps-toolkit";
import { validateLicense } from "../../utils/translationstudio";
import { LOGO } from "../../utils/logo";
import Image from "next/image";

type ContentType = {
	displayField: string;
	uid: string;
	name: string;
}

type AvailableContentTypes = {
	[id:string] : ContentType
}

interface ContentTypeResult {
	displayField: string;
	name: string;
	sys: {
		id: string
	}
}


type ResultList<T> = {
	total: number;
	limit: number;
	items: T[]
}


async function getEntriesByContentType(sdk:PageAppSDK, type: string)
{

}


async function getAllContentTypes(sdk:PageAppSDK)
{
	const result:AvailableContentTypes = { }
	const limit = 1000;
	let skip = 0;
	let hasMore = true;

	do 
	{
		const list:ResultList<ContentTypeResult> = await sdk.cma.contentType.getMany({ query: { limit: limit, skip: skip } });
		if (list.total > 0 && list.items.length > 0)
		{
			list.items.forEach(e => { 
				const name = e.name;
				const uid = e.sys.id;
				const field = e.displayField;

				if (name && uid && field)
				{
					result[uid] = {
						displayField: field,
						uid: uid,
						name: name
					}
				}
			});

			if (list.total < limit)
				hasMore = false;
		}
		else 
			hasMore = false;

	} 
	while (hasMore);
	
	return result;
}

export default function Dashboard()
{
	const sdk = useSDK<PageAppSDK>();
    const translationstudioLicense = sdk.parameters?.installation?.translationStudioKey ?? "";

    if (!translationstudioLicense)
    {
        return <>
            <div style={{ textAlign: "center", paddingTop: "5em"}}>
                <Image height={50} width={116} src={LOGO} alt="" className={css({ height: "100px", width: "227px", display: "inline-block" })} />
            </div>
            <div style={{ textAlign: "center", paddingTop: "5em"}}>
                <Paragraph>Please go to the App configuration and enter a valid translationstudio license</Paragraph>
            </div>
        </>
    }

    async function InitSpace()
    {
        const space = await sdk.cma.space.get({  });
        const list = await sdk.cma.entry.getMany({});
		const contentTypes = await getAllContentTypes(sdk);
		console.log(contentTypes)
    }

    useEffect( () =>{ InitSpace() }, [] );
    
    /*

	useEffect(() => {
		(async () => {
			// Get current parameters of the app.
			// If the app is not installed yet, `parameters` will be `null`.
			const currentParameters: AppInstallationParameters | null = await sdk.app.getParameters();
			if (currentParameters) 
			{
				setParameters(currentParameters);
				currentParameters.translationStudioKey && (await keyCheck(currentParameters.translationStudioKey));
			}

			sdk.app.setReady();
		})();
	}, [sdk]);

	const [validKey, setValidKey] = useState(false);

	const keyCheck = async (key: string) => {
		if (!key) 
			return false;

		try 
		{
			const response = await validateLicense(key);
			const status = response.status === 204;
			setValidKey(status);
			return status;
		} 
		catch (e:any) 
		{
			console.error(e.message ?? e);
			return false;
		}
	};
	const onKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValidKey(false);
		setParameters({ ...parameters, translationStudioKey: e.target.value });
	};

	const onKeyCheck = async () => {
		if (!parameters.translationStudioKey) return false;
		const valid = await keyCheck(parameters.translationStudioKey);
		if (valid) sdk.notifier.success("Thanks. The license is valid");
		else sdk.notifier.error("Sorry. The license is not valid");
	};
	
	return (
		<Flex flexDirection="column" className={css({ margin: "80px" })}>
			<div className={css({ textAlign: "center", marginBottom: "20px" })}>
				<Image width="227" height="100" src={LOGO} alt="" className={css({ display: "inline-block" })} />
			</div>
			<Form>
				<Heading>translationstudio license</Heading>
				<SectionHeading marginBottom="spacingXs">Pase your translationstudio license here</SectionHeading>
				<Flex className={css({ alignItems: "flex-start", marginBottom: "10px" })}>
					<Textarea
						className={css({ width: "100%", marginRight: "20px" })}
						placeholder="translationstudio License"
						name="translationStudioKey"
						id="translationStudioKey"
						rows={2}
						value={parameters.translationStudioKey || ""}
						onChange={onKeyChange}
						isRequired
					/>
					<Button variant="positive" isDisabled={!parameters.translationStudioKey || validKey} onClick={onKeyCheck}>Validate License</Button>
				</Flex>
				<Caption className={css({ textAlign: "center", display: "block" })}>
					You can obtain your translationstudio license from your account at <TextLink href="https://account.translationstudio.tech">https://account.translationstudio.tech</TextLink>. Further information is available at <TextLink href="https://github.com/translationstudio/contentful-extension">https://github.com/translationstudio/contentful-extension</TextLink>.
					<br/>For additional support, please contact us using your <TextLink href="https://account.translationstudio.tech">https://account.translationstudio.tech</TextLink> account.
				</Caption>
			</Form>

		</Flex>
	);
    */

    return <Flex flexDirection="column" className={css({ margin: "5em" })}>
			<div className={css({ textAlign: "right", marginBottom: "2em" })}>
				<Image width="227" height="100" src={LOGO} alt="" className={css({ display: "inline-block" })} />
			</div>
			<Caption>Dashboard</Caption>
		</Flex>
};
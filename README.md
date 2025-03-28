# Contentful translationstudio extension

This plugin allows you to add enterprise translation management to your Contentful translation process. 

> [!IMPORTANT]
> You will need a [translationstudio.tech](https://translationstudio.tech) subscription

> [!NOTE]
> You can either host the app yourself of use the app at `https://contentful.translationstudio.tech`

## About this extension

This extension connects translationstudio to your Contentful spaces. It connects to the translationstudio gateway and, thereby, keeps all business logic separate. Consequently, this extension only adds necessary UI elements and features to Contentful.

> [!NOTE]
> This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

## Adding this extension to your Contentful spaces

To add this extension to your Contentful ogranisation, please follow the steps below:

1. Open your **Organization settings & subscriptions** and navigate to **Apps**
2. Create a new app
3. Provide the name `translationstudio`
4. Add the frontend URL, e.g. `https://contentful.translationstudio.tech` 
4. Select the **Locations** `App configuration screen` and `Entry sidebar`
5. Click on **Save**
6. Install the app to your space(s)

You will need to configure the app in each space. You can find it at **Apps** - **Installed Apps**

> [!NOTE]
> You need to create a [translationstudio.tech](https://translationstudio.tech) license to configure this extension.

### Create CMA tokens

To allow translationstudio to access your space(s), you will need to create respective CMA tokens (Settings menu of your space). These will be needed when configuring the translationstudio Contentful connector with your translationstudio account.

> [!IMPORTANT]
> translationstudio will only use these tokens in order to export content to be translated and to import translated content. We never share your tokens with others.

### Configure translationstudio

Head over to your translationstudio account and configure your translation and contentful access settings. Finally, you will be able to create a license which you will need to add to translationstudio's space configuration.

## Privacy

This extension is developed by I-D Media GmbH, Germany. Visit us at https://idmedia.com 

This app does may collect personal data when using this extension:

1. Your IP address will be stored in the log files of the server hosting this application, `herokuapp.com`. This cannot be helped, because it is a technical necessity
2. Your email address may be stored by translationstudio to send you email notifications if you select the respective checkbox. 

> [!NOTE]
> Your email address will not be shared with others or used for purposes other than sending you status updates of your translation requests.

import { IExtensionDataManager, IExtensionDataService, IHostNavigationService, IProjectPageService } from "azure-devops-extension-api";
import { Header } from "azure-devops-ui/Header";
import { Observer } from "azure-devops-ui/Observer";
import { Page } from "azure-devops-ui/Page";
import { Panel } from "azure-devops-ui/Panel";
import { Table } from "azure-devops-ui/Table";
import { TextField } from "azure-devops-ui/TextField";
import * as SDK from "azure-devops-extension-sdk";

async function getExtensionDataManager(): Promise<IExtensionDataManager> {    
    const dataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
    const accessToken = await SDK.getAccessToken();        
    const dataManager = await dataService.getExtensionDataManager(SDK.getExtensionContext().id, accessToken)
    return dataManager;
}

async function getProjectPageService(): Promise<IProjectPageService> {   
    const projectPageService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
    return projectPageService;
}

async function getNavigationService(): Promise<IHostNavigationService> {
    const navService = await SDK.getService<IHostNavigationService>(CommonServiceIds.HostNavigationService);
    return navService;
}

/**
 * Contribution ids of core DevOps services which can be obtained from DevOps.getService
 */
 enum CommonServiceIds {
    /**
     * Service for interacting with the extension data service
     */
    ExtensionDataService = "ms.vss-features.extension-data-service",
    /**
     * Service for showing global message banners at the top of the page
     */
    GlobalMessagesService = "ms.vss-tfs-web.tfs-global-messages-service",
    /**
     * Service for interacting with the host window's navigation (URLs, new windows, etc.)
     */
    HostNavigationService = "ms.vss-features.host-navigation-service",
    /**
     * Service for interacting with the layout of the page: managing full-screen mode,
     * opening dialogs and panels
     */
    HostPageLayoutService = "ms.vss-features.host-page-layout-service",
    /**
     * Service for getting URLs/locations from the host context
     */
    LocationService = "ms.vss-features.location-service",
    /**
     * Exposes project-related information from the current page
     */
    ProjectPageService = "ms.vss-tfs-web.tfs-page-data-service"
}

const CommonServices = {
    getExtensionDataManager,
    getNavigationService,
    getProjectPageService
}
export {
    CommonServiceIds,
    CommonServices,
    Header,
    Observer,
    Page,
    Panel,
    Table,
    TextField
}
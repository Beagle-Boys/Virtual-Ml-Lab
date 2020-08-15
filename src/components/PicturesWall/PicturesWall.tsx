import React from "react";
import styles from "./PicturesWall.module.css";
import { Upload, Modal } from "antd";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";

const toBase64: (
  file: File
) => Promise<string | ArrayBuffer | null | ProgressEvent<FileReader>> = (
  file: File
) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export interface FileType {
  uid: string;
  name: string;
  status: "uploading" | "done" | "error" | "removed";
  url: string;
}

interface Props {
  files?: UploadFile[];
  onChange?: (uid: string) => void;
}

class PicturesWall extends React.Component<Props, {}> {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: this.props.files,
  };
  componentWillReceiveProps(props: Props) {
    if (props.files !== this.state.fileList)
      this.setState({ fileList: props.files });
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj instanceof File) {
      let base64 = (await toBase64(file.originFileObj)) || "";
      if (typeof base64 === "string") file.preview = base64;
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || "image",
    });
  };
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    return (
      <div className={styles.clearfix}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          className={styles.upload}
          action={() => "done"}
          onPreview={this.handlePreview}
          onRemove={(file) => {
            if (this.props.onChange) this.props.onChange(file.uid);
          }}
        ></Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;

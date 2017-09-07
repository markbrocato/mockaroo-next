import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'material-ui';
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/ruby/ruby';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/placeholder';


export default class AdvancedFormulaDialog extends Component {

    state = {
        value: null
    }

    componentWillMount() {
        this.setState({ value: this.props.value })
    }

    componentWillUpdate(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value })
        }
    }

    render() {
        const { onRequestClose, onRequestApply, ...props } = this.props;
        const { value } = this.state;

        return (
            <Dialog {...props} onRequestClose={onRequestClose} maxWidth="md">
                <DialogTitle>Add Inline Formula</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'row', width: '700px', padding: 0 }}>
                    <div style={{ flex: 1, borderColor: '#D0D0D0', borderStyle: 'solid', borderWidth: '1px 0', padding: '10px 20px' }}>
                        <CodeMirror 
                            options={{
                                mode: 'ruby',
                                placeholder: 'example: upper(this)',
                            }}
                            autoFocus
                            ref={t => this.formula = t} 
                            value={value || ''}
                            onChange={this.onValueChange}
                        />
                    </div>
                    <div style={{ padding: '0 20px', width: '270px', backgroundColor: '#FAFAFA', borderColor: '#D0D0D0', borderStyle: 'solid', borderWidth: '1px 0 1px 1px', fontSize: '14px' }}>
                        <p>Alter the value of this field using <a href="/help/formulas">Mockaroo formula syntax</a>.</p>
                        <p>Use <code>this</code> to refer to the value of this field.</p>
                        <p>Examples:</p>
                        <p>
                            <code>this + 1</code>
                            <p>Add 1 to the value of this field.</p>

                            <code>upper(this)</code>
                            <p>Changes the value of this field to upper case.</p>
<code style={{ whiteSpace: 'pre', display: 'block' }} dangerouslySetInnerHTML={{ __html: `if this == 'January' 
    'cold' 
elsif this == 'July' 
    'hot' 
else 
    'mild' 
end`}}/>
                            <p>Transforms the value of this field based on custom logic.</p>
                        </p>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onApply} color="primary" raised>Apply</Button>
                    <Button onClick={onRequestClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }

    onValueChange = (value) => {
        this.setState({ value })
    }

    onApply = () => {
        this.props.onRequestApply(this.state.value)
    }

}